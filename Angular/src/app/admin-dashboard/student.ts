export class Student {
  // tslint:disable-next-line: variable-name
  _id: string;
  status: string;
  profile: {
    First_Name: string;
    Last_Name: string;
    Gender: string;
    Email: string;
    Password: string;
    Phone_No: string;
    Address: string;
    CNIC: string;
    Country: string;
    City: string;
};
Acedmic: {
    Qualification: string;
    Specialization: string;
    Current_Status: string;
    Future_Plan: string;
    Know: string;
};
Program: Program1[];
Pic: {
  // tslint:disable-next-line: variable-name
  _id: string;
  imagePath: string;
};
}


export class Program {
  id: string;
  name: string;
  Duration: string;
  Fees: string;
  Description: string;
}

export class Program2 {
  id: string;
  name: string;
  Duration: string;
  Fees: string;
  Introduction: string;
  learn1: string;
  learn2: string;
  learn3: string;
  learn4: string;
  learn5: string;
  learn6: string;
  Requirement1: string;
  Requirement2: string;
  Requirement3: string;
  Description: string;
  imagePath: string;
}
export class Program1 {
  id: string;
  name: string;
  Duration: string;
  Fees: string;
  Introduction: string;
  learn1: string;
  learn2: string;
  learn3: string;
  learn4: string;
  learn5: string;
  learn6: string;
  Requirement1: string;
  Requirement2: string;
  Requirement3: string;
  Description: string;
  imagePath: string;
}

export class Video {
  id: string;
  name: string;
  Introduction: string;
  imagePath: string;
}

export class VideoArray {
  message: string;
  video: {
    id: string;
  name: string;
  Introduction: string;
  imagePath: string;
  };
}

export class NewsModel {

  // tslint:disable-next-line: variable-name
  _id: string;
  newsHeading: string;
  newsContent: string;
}

export interface Post {
  id: string;
  postHeading: string;
  postContent: string;
  imagePath: string;
}
export interface Pic {
  id: string;
  imagePath: string;
}

