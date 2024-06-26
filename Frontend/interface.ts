interface HotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    region: string,
    picture: string,
    __v: number,
    rooms: RoomItem[],
    bookings: BookingItem[],
    id: string
}

interface RoomItem {
    _id: string,
    roomNo: string,
    hotel: {
        _id: string,
        name: string,
        province: string,
        tel: string,
        id: string
    },
    roomType: string,
    price: string,
    picture: string,
    __v: string
}



interface BookingItem {
    _id: string,
    bookingDate: string,
    bookingEnd: string,
    user: {
        _id: string,
        name: string,
        
    },
    hotel: {
        _id: string,
        name: string,
        province: string,
        tel: string,
        id: string
    },
    room: {
        _id: string,
        roomNo: string,
        roomType: string
    },
    rating: number,
    createdAt: string,
    __v: string
}
interface Notifications {
    
    type:       string;
    title:      string;
    message:    string;
    bookingId:  string;
    bookings:   BookingItem;
    user:       string;
    roomNo:     string;
    roomType:   string;
    editor:     string;
    Hotel:      string;
    createAt:   string;
    bookingDate:string;
    bookingEnd: string; 
}
interface NotificationsData{
    type : string,
    Hotel : string,
    roomNo : string,
    checkin :string,
    checkout  :string,
    bookingId : string,
    userId    : string
}
    
interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
}

interface RoomJson {
    success: boolean,
    count: number,
    data: RoomItem[]
}

interface BookingJson {
    success: boolean,
    count: number,
    data: BookingItem[]
}

interface HotelData {
    name: FormDataEntryValue,
    address: FormDataEntryValue,
    district: FormDataEntryValue,
    province: FormDataEntryValue,
    postalcode: FormDataEntryValue,
    tel: FormDataEntryValue,
    region: FormDataEntryValue,
    picture: string
}

interface BookingData {
    hid: string,
    roomid: string,
    bDate: string,
    bEnd: string
}

interface UserPayload {
    name: string,
    email: string,
    tel: string,
    password: string,
    role: string,
    hid?: string
}

interface RoomPayload {
    roomNo: string;
    roomType: string;
    price: string;
}
