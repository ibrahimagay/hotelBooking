import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      entryReleaseDateSelected:JSON.parse(localStorage.getItem('entryReleaseDateSelected')) == null ? []: JSON.parse(localStorage.getItem('entryReleaseDateSelected')),
      hotelSelected: JSON.parse(localStorage.getItem('hotelSelected')) == null ? 'Rezervasyon Yapmak İstediğiniz Oteli Seçiniz.' : JSON.parse(localStorage.getItem('hotelSelected')),
      hotelSelectedName:localStorage.getItem('hotelSelectedName') == null ? '' : localStorage.getItem('hotelSelectedName'),
      hotelDetail: JSON.parse(localStorage.getItem('hotelDetail')) == null ? {} : JSON.parse(localStorage.getItem('hotelDetail')),
      adultSize:localStorage.getItem('adultSize') == null ? 5 : parseInt(localStorage.getItem('adultSize')),
      adultSelected:JSON.parse(localStorage.getItem('adultSelected')) == null ? 0 : JSON.parse(localStorage.getItem('adultSelected')),
      childrenSize: 5,
      childrenSelected: JSON.parse(localStorage.getItem('childrenSelected')) == null ? 0 : JSON.parse(localStorage.getItem('childrenSelected')),
      childrenStatus:localStorage.getItem('childrenStatus') == null ? false : localStorage.getItem('childrenStatus'),
      roomTypeSelected:localStorage.getItem('roomTypeSelected') == null ? 0 : localStorage.getItem('roomTypeSelected'),
      roomTypeName:localStorage.getItem('roomTypeName') == null ? 0 : localStorage.getItem('roomTypeName'),
      roomPrice:localStorage.getItem('roomPrice') == null ? 0 : localStorage.getItem('roomPrice'),
      roomScenicSelected:JSON.parse(localStorage.getItem('roomScenicSelected')) == null ? 0 : JSON.parse(localStorage.getItem('roomScenicSelected')),
      roomScenicTypeName:localStorage.getItem('roomScenicTypeName') == null ? 0 : localStorage.getItem('roomScenicTypeName'),
      roomScenicPriceRate:localStorage.getItem('roomScenicPriceRate') == null ? 0 : localStorage.getItem('roomScenicPriceRate'),
      couponCodeTitle:localStorage.getItem('couponCodeTitle') == null ? 0 : localStorage.getItem('couponCodeTitle'),
      totalPrice:JSON.parse(localStorage.getItem('totalPrice')) == null ? 0 : JSON.parse(localStorage.getItem('totalPrice')),
      couponDiscountAmmount:JSON.parse(localStorage.getItem('couponDiscountAmmount')) == null ? 0 : JSON.parse(localStorage.getItem('couponDiscountAmmount')),
      discountStatus:JSON.parse(localStorage.getItem('discountStatus')) == null ? false : JSON.parse(localStorage.getItem('discountStatus')),
      postId:localStorage.getItem('postId') == null ? 0 : localStorage.getItem('postId'),
      postIdStatus:JSON.parse(localStorage.getItem('postIdStatus')) == null ? false : JSON.parse(localStorage.getItem('postIdStatus')),
  },
  mutations: {
    clearStore:(state)=>{
      state.entryReleaseDateSelected = [];
      state.hotelSelected = 'Rezervasyon Yapmak İstediğiniz Oteli Seçiniz.';
      state.hotelSelectedName = '';
      state.hotelDetail = {};
      state.adultSize = 5;
      state.adultSelected = 0;
      state.childrenSize = 5;
      state.childrenSelected = 0;
      state.childrenStatus = false;
      state.roomTypeSelected = 0;
      state.roomTypeName = 0;
      state.roomPrice = 0;
      state.roomScenicSelected = 0;
      state.roomScenicTypeName = 0;
      state.roomScenicPriceRate = 0;
      state.couponCodeTitle = 0;
      state.totalPrice = 0;
      state.couponDiscountAmmount = 0;
      state.discountStatus = false;
      state.postId = 0;
      state.postIdStatus = false;
      localStorage.clear();
    },
    setHotelSelected: (state,value) =>
    {state.hotelSelected = value;
     window.localStorage.setItem('hotelSelected',value)
    },
    setHotelSelectedName: (state,value) =>
    {state.hotelSelectedName = value;
     window.localStorage.setItem('hotelSelectedName',value)
    },
    setEntryReleaseDateSelected: (state,value) =>
     {state.entryReleaseDateSelected = value;
      window.localStorage.setItem('entryReleaseDateSelected',JSON.stringify(value))
    },
    setAdultSize: (state,value) =>
     {state.adultSize = value;
      window.localStorage.setItem('adultSize',value)
    },
    setAdultSelected: (state,value) =>
     {state.adultSelected = value;
      window.localStorage.setItem('adultSelected',value)
    },
    setChildrenSelected: (state,value) =>
     {state.childrenSelected = value;
      window.localStorage.setItem('childrenSelected',value)
    },
    setChildrenStatus: (state,value) =>
     {state.childrenStatus = value;
      window.localStorage.setItem('childrenStatus',value)
    },
    setHotelDetail: (state,value) =>
     {state.hotelDetail = value;
      window.localStorage.setItem('hotelDetail',JSON.stringify(value) )
    },
    setRoomTypeSelected: (state,value) =>
     {state.roomTypeSelected = value;
      window.localStorage.setItem('roomTypeSelected',value)
    },
    setRoomTypeName: (state,value) =>
     {state.roomTypeName = value;
      window.localStorage.setItem('roomTypeName',value)
    },
    setRoomPrice: (state,value) =>
     {state.roomPrice = value;
      window.localStorage.setItem('roomPrice',value)
    },
    setRoomScenicSelected: (state,value) =>
     {state.roomScenicSelected = value;
      window.localStorage.setItem('roomScenicSelected',value)
    },
    setRoomScenicTypeName: (state,value) =>
     {state.roomScenicTypeName = value;
      window.localStorage.setItem('roomScenicTypeName',value)
    },
    setRoomScenicPriceRate: (state,value) =>
     {state.roomScenicPriceRate = value;
      window.localStorage.setItem('roomScenicPriceRate',value)
    },
    setCouponCodeTitle: (state,value) =>
     {state.couponCodeTitle = value;
      window.localStorage.setItem('couponCodeTitle',value)
    },
    setTotalPrice: (state,value) =>
     {state.totalPrice = value;
      window.localStorage.setItem('totalPrice',value)
    },
    setCouponDiscountAmmount: (state,value) =>
     {state.couponDiscountAmmount = value;
      window.localStorage.setItem('couponDiscountAmmount',value)
    },
    setDiscountStatus: (state,value) =>
     {state.discountStatus = value;
      window.localStorage.setItem('discountStatus',value)
    },
    setPostId: (state,value) =>
     {state.postId = value;
      window.localStorage.setItem('postId',value)
    },
    setPostIdStatus: (state,value) =>
     {state.postIdStatus = value;
      window.localStorage.setItem('postIdStatus',value)
    },
  },
  getters: {
    getHotelSelected: state => {
      return state.hotelSelected;
    },
    getHotelSelectedName: state => {
      return state.hotelSelectedName;
    },
    getEntryReleaseDateSelected: state => {
      return state.entryReleaseDateSelected;
    },
    getAdultSize: state => {
      return state.adultSize;
    },
    getAdultSelected: state => {
      return state.adultSelected;
    },
    getChildrenSelected: state => {
      return state.childrenSelected;
    },
    getChildrenStatus: state => {
      return state.childrenStatus;
    },
    getHotelDetail: state => {
      return state.hotelDetail;
    },
    getRoomTypeSelected: state => {
      return state.roomTypeSelected;
    },
    getRoomTypeName: state => {
      return state.roomTypeName;
    },
    getRoomPrice: state => {
      return state.roomPrice;
    },
    getRoomScenicSelected: state => {
      return state.roomScenicSelected;
    },
    getRoomScenicTypeName: state => {
      return state.roomScenicTypeName;
    },
    getRoomScenicPriceRate: state => {
      return state.roomScenicPriceRate;
    },
    getCouponCodeTitle: state => {
      return state.couponCodeTitle;
    },
    getTotalPrice: state => {
      return state.totalPrice;
    },
    getCouponDiscountAmmount: state => {
      return state.couponDiscountAmmount;
    },
    getDiscountStatus: state => {
      return state.discountStatus;
    },
    getPostId: state => {
      return state.postId;
    },
    getPostIdStatus: state => {
      return state.postIdStatus;
    },
  }
})