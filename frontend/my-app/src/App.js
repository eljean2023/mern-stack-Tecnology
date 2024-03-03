import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Container} from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import MarketScreen from './screens/MarketScreen';
import AddProductScreen  from './screens/AddProductScreen';
import ProfileInfoScreen from './screens/ProfileInfoScreen';
import UserProductScreen from './screens/UserProductScreen';
import Player from './components/playVideAudi';
import CartProductScreen from './screens/CartProductScreen';
import SingleProScreen from './screens/SingleProScreen';
import ProductUpScreen from './screens/ProductUpScreen'
import ShippingItemScreen from './screens/ShippingItem.Screen';
import PaymentScreen from './screens/PaymentScreen';
import Placeorder from './screens/Placeorder';
import Order from './screens/OrderScreen';
import ProfileOrdersScreen from './screens/ProfileOrdersScreen';
import SearchEvents from './components/SearchEvents';
import AddCourseScreen from './screens/AddCourseScreen';
import CourseScreen from './screens/CourseScreen';
import AddAgendaScreen from './screens/addAgendaScreen';
import AllAgendasScreen from './screens/agendaAllList'
import UserAgendaScreen from './screens/UserAgendaScreen';
import AgendaUpScreen from './screens/AgendaUpScreen';
import RoomScreen from './screenVideoConference/RoomScreen'; 
import LiveScreen from './screenVideoConference/LiveScreen'; 

import CreateRoom from './components/CreateRoom';
import CreateLive from './components/CreateLive';
import JoinRoom from './components/JoinRoom';
import JoinLive from './components/JoinLive';
import ParticipantR from './screenVideoConference/ParticipantsRoom';
import SendNotifi from './screenVideoConference/SendNotifi';

import { useReactMediaRecorder } from "react-media-recorder";

function RecordView() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
};


const App = ()=> {
  
  return <>
  <Header/>
  <BrowserRouter>
    <main className='py-4'>
    <Container>
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route path="/search/:keyword" element={<Home/>}></Route>
      <Route path="/login" element={<LoginScreen/>}></Route>
      <Route path="/register" element={<RegisterScreen/>}></Route>
      <Route path="/profile" element={<ProfileScreen/>}></Route>
      <Route path="/profileInfo" element={<ProfileInfoScreen/>}></Route>
      <Route path="/myOrders" element={<ProfileOrdersScreen/>}></Route>
      <Route path="/market" element={<MarketScreen/>}></Route>
      <Route path="/courseAdd" element={<AddCourseScreen/>}></Route>
      <Route path="/addProduct" element={<AddProductScreen/>}></Route>
      <Route path="/player" element={<Player/>}></Route>
      <Route path="/userproducts" element={<UserProductScreen/>}></Route>
      <Route path="/useragenda" element={<UserAgendaScreen/>}></Route>
      <Route path="/cart/:id?" element={<CartProductScreen/>}></Route>
      <Route path="/product/:id?" element={<SingleProScreen/>}></Route>
      <Route path="/productUp/:id?" element={<ProductUpScreen/>}></Route>
      <Route path="/agendaUp/:id?" element={<AgendaUpScreen/>}></Route>
      <Route path="/shipping" element={<ShippingItemScreen/>}></Route>
      <Route path="/payment" element={<PaymentScreen/>}></Route>
      <Route path="/placeorder" element={<Placeorder/>}></Route>
      <Route path="/order/:id" element={<Order/>}></Route>
      <Route path="/addEvent" element={<AddAgendaScreen/>}></Route>
      <Route path="/agendaAlls" element={<AllAgendasScreen/>}></Route>
      <Route path="/courseAlls" element={<CourseScreen/>}></Route>
      {/* <Route render={({history}) => <SearchEvents history={history}/> } /> */}

      <Route path="/room/:id?" element={<RoomScreen/>}></Route>
      <Route path="/live/:id?" element={<LiveScreen/>}></Route>
      <Route path="/createRoomx" element={<CreateRoom/>}></Route>
      <Route path="/createLivex" element={<CreateLive/>}></Route>
      <Route path="/joinRoomx/:id" element={<JoinRoom/>}></Route>
      <Route path="/joinLivex/:id" element={<JoinLive/>}></Route>
      <Route path="/participantsR/:id" element={<ParticipantR/>}></Route>
      <Route path="/sendNotifi" element={<SendNotifi/>}></Route>

      <Route path="/rev" element={<RecordView/>}></Route>

    </Routes>
    </Container>
      
    </main>
    </BrowserRouter>
    
  <Footer/>
      
  </>
}

export default App;
