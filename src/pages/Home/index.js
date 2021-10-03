import React, {useState, useEffect} from 'react';

import { ScrollView, ActivityIndicator } from 'react-native';

import { Container, SearchContainer, Input, SearchButton, Title, BannerButton, Banner, SliderMovie } from './styles';

import SliderItem from '../../components/SladerItem';

import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons';

import api, {key} from '../../services/api';

import {getListMovies, randomBanner} from '../../utils/movies'

import { useNavigation } from '@react-navigation/native';

export default function Home() {


  //hooks
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovies, setBannerMovies] = useState({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect( () => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies(){
     // const response = await api.get('/movie/now_playing', {
      //  params:{
       //   api_key: key,
      //    language:'pt-BR',
      //    page: 1,
      //  }
     // })

     const [nowData, popularData, topData] = await  Promise.all([
      api.get('/movie/now_playing',{
        params:{
             api_key: key,
            language:'pt-BR',
            page: 1,
           }
      }),

      api.get('/movie/popular',{
        params:{
             api_key: key,
            language:'pt-BR',
            page: 1,
           }
      }),

      api.get('/movie/top_rated',{
        params:{
             api_key: key,
            language:'pt-BR',
            page: 1,
           }
      }),

     ])

     //verificando se a active esta true.
     if(isActive){
      //limitando quantidade de busca de filme
     const nowList = getListMovies(10, nowData.data.results);
     const popularList = getListMovies(6, popularData.data.results);
     const topList = getListMovies(5, topData.data.results);

     

     setBannerMovies(nowData.data.results[randomBanner(nowData.data.results)]);

     //passa lista para o state
     setNowMovies(nowList);
     setPopularMovies(popularList);
     setTopMovies(topList);

     setLoading(false);

     }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    }
  },[])

  function navigateDetailspage(item){
    navigation.navigate('Detail', { id: item.id })
  }


  //exibindo loading se estiver true.
  if(loading){
    return(
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    )
  }

 return (
   <Container>
      <Header title="Space 🚀 Filmes" />
       
       <SearchContainer>
         <Input 
          placeholder="Ex Vigadores"
          placeholderTextColor="#ddd"
         />
         <SearchButton>
            <Feather name="search" size={30} color="#FFF" />
         </SearchButton>
       </SearchContainer>

       <ScrollView showsVerticalScrollIndicator={false} >
         <Title>Em Cartaz</Title>

         <BannerButton activeOpacity={0.9}  onPress={ () => navigateDetailspage(bannerMovies)} >
           <Banner 
            resizeMethod="resize"
            source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovies.poster_path}`}}
           />
         </BannerButton>

         <SliderMovie 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={ ({ item }) => <SliderItem data={item} navigatePage={ () => navigateDetailspage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
         />

         <Title>Populares</Title>

         <SliderMovie 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={ ({ item }) => <SliderItem data={item} navigatePage={ () => navigateDetailspage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
         />

         <Title>Mais Votados</Title>

         <SliderMovie 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={ ({ item }) => <SliderItem data={item} navigatePage={ () => navigateDetailspage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
         />

       </ScrollView>
   </Container>
  );
}