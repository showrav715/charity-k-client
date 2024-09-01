import { handler } from "@material-tailwind/react/types/components/dialog";
import { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export interface IDepositAndWithdrowCard {
  title: string;
}
export interface ICreateCampaign {
  title: string;
}

export interface ILogsTable {
  title: string;
  table_data: any;
}

export interface ICampaignTable {
  table_data: any;
  campaignName?: string;
  goal?: string;
  funded?: string;
  dayLeft?: number;
  status?: string;
  donors?: number;
  title: string;
}

export interface IBiddingList {
  tableHead: string[];
  tableData: any;
}

export interface IDashBTable {
  tableHead: string[];
  tableData: any;
}

export interface IWishlistsTable {
  tableHead: string[];
  tableData: any;
}

export interface ITicketsTable {
  table_data: any;
}

export interface ITransactions {
  limit: number;
}

export interface IButton {
  text: string;
  styles: string;
  clickHandler?: any;
  isLink?: boolean;
  href?: string;
  btnType?: "button" | "submit" | "reset";
  status?: boolean;
}

export interface IIconButton {
  styles: string;
  clickHandler?: any;
  isLink?: boolean;
  href?: string;
  svg?: ReactNode;
}

export interface IAucCatCard {
  img: string;
  title: string;
  auctionId: string;
  awardCount: string;
}

export interface IAuctionCard {
  img: string;
  title: string;
  ratings?: string;
  bid: string;
  time: string;
  wrapperCls?: string;
  smCard?: boolean;
  currency?: string;
  slug: string;
}
export interface IChatCard {
  isAttached: boolean;
  userImg: string;
  date: string;
  message: string;
  type: string;
}

export interface IDashboardCard {
  img: string;
  value: number;
  title: string;
  currency: boolean;
}

export interface IProductDetailsCard {
  openModal: boolean;
  handleOpenModal: any;
}

export interface IDocument {
  frontSide?: string;
  backSide?: string;
}

export interface INiceSelect {
  options: string[];
  defaultValue: string;
  onChange: (e: any) => void;
  wrapperClass: string;
}

export interface IButtonLink {
  cls?: string;
  title?: string;
  outline?: any;
}
export interface IRemoveModalCard {
  title: string;
  confirmationText: string;
  remove_btn_text: string;
  openRemoveModal: boolean;
  handleOpenRemoveModal: handler;
}

export interface ISmallAuctionCard {
  img: string;
  title: string;
  link_to: string;
  date: string;
}

export interface IProduct {
  id: string;
  title: string;
  goal: string;
  raised: string;
  status: number;
  photo: string;
}

export interface ICampaign {
  id: string;
  slug: string;
  title: string;
  goal: number;
  raised: number;
  status: number;
  close_type: string;
  end_date: string;
}

export interface ITeamCardProps {
  id?: string | number;
  img: string;
  name: string;
  desig: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}
export interface IBlogMdCard {
  id?: string | number;
  img: string;
  title: string;
  des: string;
  admin: string;
  user_img: string;
  date: string;
  link_to: string;
}
