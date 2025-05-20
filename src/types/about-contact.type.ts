export interface abouttype {
    hero: {
        photourl: string;
        header: string;
        description: string;
    };
    restaurantName: string;
    story: {
        photourl: string;
        header: string;
        description1: string;
        description2: string;
    };
    unforgettable: {
        bgimgurl: string;
        header: string;
        description: string;
    };
}

export interface contacttype {
    socialmedias: {
        instagram: string;
        facebook: string;
        tiktok: string;
        google: string;
        traveladvisor: string;
    },
    openstatus: {
        sun: string;
        mon: string;
        tue: string;
        wed: string;
        thur: string;
        fri: string;
        sat: string;
    },
    location: string;
    locationurl: string;
    phone: string;
    email: string;
    iframeurl: string;
    bgimg: string;
}