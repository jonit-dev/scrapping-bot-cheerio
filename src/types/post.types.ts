
export enum PostCategory {
  Job = "Job",
  Internship = "Internship",
  Temporary = "Temporary"
}

export enum PostPositionType {
  FullTime = "Full-time",
  PartTime = "Part-time",
  Custom = "Custom"
}

export enum PostBenefits {
  Meal = "Meal",
  FoodTicket = "FoodTicket",
  Transportation = "Transportation",
  HealthCare = "HealthCare",
  LifeInsurance = "LifeInsurance",
  DentalPlan = "DentalPlan"
}

export enum IPostApplicationStatus {
  Pending = 'Pending',
  Done = 'Done'
}

export interface IPostApplication {
  resumeId: string,
  status: IPostApplicationStatus,
  jobRole: string
}

export enum IPostSource {
  Blog = "Blog",
  Facebook = "Facebook",
  Internal = "Internal",
  Other = "Other"
}

export interface IPost {
  sector: string,
  category: string,
  positionType?: PostPositionType
  benefits?: string[],
  country: string;
  jobRoles: string[],
  stateCode: string,
  city: string,
  title: string,
  content?: string,
  externalUrl?: string,
  email?: string;
  phone?: string,
  source?: IPostSource,
  schedule?: string,
  companyName?: string,
  requisites?: string,
  experienceRequired?: boolean,
  monthlySalary?: number;
  yearlySalary?: number;
  hourlySalary?: number;
  images?: Array<String | undefined>,
  likes: number;
  usersWhoLiked: string[],
  applications: IPostApplication[]
  owner: Object
}