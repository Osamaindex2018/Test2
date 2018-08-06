import React, { Component, version } from 'react';
import { Text, View, Dimensions, StyleSheet, Image, Button, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';

class Cell extends Component {
  render() {
    return <View {...this.props}>{this.props.children}</View>;
  }
}

const ViewTypes = {
  HALF_LEFT: 1,
  HALF_RIGHT: 2
};
export default class Screen2 extends Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');


    this._layoutProvider = new LayoutProvider(
      index => {
        if (index % 2 === 0) {
          return ViewTypes.HALF_LEFT;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = Math.floor(width / 2);
            dim.height = 160;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = Math.floor(width / 2);
            dim.height = 160;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }

    );


    this.state = {
      // dataProvider2: this.generateArray(3000),
      dataProvider: new DataProvider(),
      loading: false,
      refrsh: false,

    };
  }
  page = 1;
  componentDidMount() {
    const { page } = this.state;
    this.generateArray(page);

  }


  generateArray(page) {
    const url = `https://randomuser.me/api/?page=${page}&results=10`;
    this.setState({ loading: true, refrsh: false });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("dataaaaaa", res);

        const dataProvider = new DataProvider((r1, r2) => r1.email !== r2.email);
        this.setState({

          dataProvider:
            page === 1 ?
              dataProvider.cloneWithRows(res.results)
              :
              dataProvider.cloneWithRows([...this.state.dataProvider.getAllData(), ...res.results]),

          loading: false,
          refrsh: false,
        })

      })
      .catch(error => {
        this.setState({ loading: false, refrsh: false });
      });
  }

  refreshArray() {
    const url = `https://randomuser.me/api/?page=1&results=10`;
    this.setState({ loading: false, refrsh: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("dataaaaaa", res);

        const dataProvider = new DataProvider((r1, r2) => r1.email !== r2.email);
        this.setState({
          dataProvider: dataProvider.cloneWithRows(res.results),
          loading: false,
          refrsh: false,
        })

      })
      .catch(error => {
        this.setState({ loading: false, refrsh: false });
      });
  }

  _rowRenderer(type, data) {
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <Cell
            style={{
              margin: 5,
              padding: 5,
              backgroundColor: "#eee",
              flex: 1,
              borderColor: "grey",
              borderRadius: 3,
              borderWidth: 1,

            }}
          >
            <View >
              <View style={{ width: 50, height: 50, borderColor: "grey",alignItems:"center",justifyContent:"center" }}>
                <Image
                  source={{ uri: data.picture.thumbnail }}
                  style={{ width: "100%", height: "100%", borderRadius: 25 }}
                />
              </View>
              <View style={{ marginLeft: 5, justifyContent: "space-between" }}>
                <Text>FirstName: {data.name.first}</Text>
                <Text>Gender: {data.gender}</Text>
                <Text>Phone: {data.phone}</Text>

              </View>
            </View>

          </Cell>
        );
      case ViewTypes.HALF_RIGHT:
        return (
          <Cell
            style={{
              margin: 5,
              padding: 5,
              backgroundColor: "#ddd",
              flex: 1,
              borderColor: "grey",
              borderRadius: 3,
              borderWidth: 1,

            }}
          >
            <View >
              <View style={{ width: 50, height: 50, borderColor: "grey",alignItems:"center" }}>
                <Image
                  source={{ uri: data.picture.thumbnail }}
                  style={{ width: "100%", height: "100%", borderRadius: 25 }}
                />
              </View>
              <View style={{ marginLeft: 5, justifyContent: "space-between" }}>
                <Text>FirstName: {data.name.first}</Text>
                <Text>Gender: {data.gender}</Text>
                <Text>Phone: {data.phone}</Text>

              </View>
            </View>

          </Cell>
        );
      default:
        return null;
    }
  }

  handleListEnd = () => {
    this.page++;
    this.generateArray(this.page);
  }
  renderFooter = () => {
    return (
      this.state.loading ?
        <ActivityIndicator
          style={{ margin: 10 }}
          size="large"
          color={'black'}
        /> : null
    )
  }
  render() {

    return (
      <RecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        renderFooter={this.renderFooter}
        onEndReached={this.handleListEnd}
        refreshControl={<RefreshControl colors={["green"]} refreshing={this.state.refrsh} onRefresh={() => this.refreshArray()} />}
      />

    );
  }
}
