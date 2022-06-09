import { css } from "styled-components";

// Btn 공통적으로 사용할 스타일
const Btn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: teal;
  background-color: powderblue;
  font-weight: bold;
  font-size: 17px;
  box-shadow: 0px 2px 3px 0px gray;
  text-decoration: none;
  border: none;
  outline: none;
  border-radius: 10px;
  transition: all 0.5s, color 0.5s ease-in-out;
  cursor: pointer;
  &:active {
    box-shadow: inset 0 0 5px 5px teal;
  }
  &:hover {
    background-color: darkcyan;
    color: powderblue;
  }
`;
// 헤더 공통
const Header = css`
  position: sticky;
  display: flex;
  width: 35vw;
  min-width: 500px;
  padding: 0px 10px;
  height: 70px;
  background-color: lavenderblush;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px gray;
`;

//작은 사이즈 버튼
export const ShortBtn = css`
  ${Btn};
  width: 100px;
  height: 50px;
  margin-left: 10px;
`;

//긴 사이즈 버튼
export const LongBtn = css`
  ${Btn};
  min-width: 400px;
  height: 50px;
`;
//페이지 헤더 공통
export const PageHeader = css`
  ${Header};
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;
