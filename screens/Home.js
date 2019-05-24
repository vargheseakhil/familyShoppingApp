import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product } from '../components/';
const { width } = Dimensions.get('screen');
import products from '../constants/products';

class Home extends React.Component {
    state = {
      loader: false,
      camera: false,
      man: true,
      woman: false,
      kid: false,
    }

  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="camera-18" family="GalioExtra" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate('Pro')}
      />
    )
  }
  
  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="grid-square" family="Galio" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Categories</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Best Deals</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderProducts = () => {
    const manProducts = () => (
      <Block flex>
          <Product product={products[0]} horizontal />
          <Block flex row>
            <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Product product={products[2]} />
          </Block>
          <Product product={products[3]} horizontal />
          <Product product={products[4]} full />
        </Block>
    )
    const womanProducts = () => (
      <Block flex>
          <Product product={products[5]} horizontal />
          <Block flex row>
            <Product product={products[6]} style={{ marginRight: theme.SIZES.BASE }} />
            <Product product={products[7]} />
          </Block>
          <Product product={products[8]} horizontal />
          <Product product={products[9]} full />
        </Block>
    )
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        {this.state.man? manProducts(): womanProducts()}
      </ScrollView>
    )
  }
  renderLadiesProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <Product product={products[5]} horizontal />
          <Block flex row>
            <Product product={products[6]} style={{ marginRight: theme.SIZES.BASE }} />
            <Product product={products[7]} />
          </Block>
          <Product product={products[8]} horizontal />
          <Product product={products[9]} full />
        </Block>
      </ScrollView>
    )
  }
  renderLoader = () => {
    return (
      <Block flex style={styles.loader}>
      <Text>
        Fetching details for the image captured
      </Text>
       <ActivityIndicator size="large" animating style={styles.loader} />
      </Block>
    )
  }

  componentDidMount(){
    const { navigation } = this.props;
    // alert('Family Shopping App would like access the camera');
    Alert.alert(
      'Allow "Family Shopping App" to access your camera while you are using the app',
      'Captured images will only be used for customising the pages and viewed items',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Allowed'),
          style: 'cancel',
        },
        {
          text: 'Allow',
          onPress: () => setDataFetching() ,
        },
      ],
    );
   setDataFetching = () => {
    setInterval( () => {
      this.setState({loader: true})
      setTimeout(() => {
       this.setState({loader: false, man: !this.state.man})
      }, 3000)
    }, 10000);
   }
   
  }

  componentWillUnmount() {
    clearInterval()
    this.setState({loader : false})
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        {this.state.loader ? this.renderLoader() : 
          this.renderProducts()}
      </Block>
    );
      
    
  }
}
export default withNavigation(Home)

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  loader: {
    marginTop: 50,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
