export interface Review {
  relativePublishTimeDescription: string;
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  text: {
    text: string;
  };
  rating: number;
  // author_url: string;
  // language: string;
  // original_language: string;
  // profile_photo_url: string;
  // rating: number;
  // relative_time_description: string;
  // text: string;
  // time: number;
  // translated: boolean;
}
