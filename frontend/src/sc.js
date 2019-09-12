import styled from 'styled-components';
import {Link} from "react-router-dom";
import { HashLink as Hlink } from 'react-router-hash-link';

export const Wrapper = styled.section`
  padding: 4em;
  background:#00ACEE;
  width:100vw;
  height:87vh;
  overflow: auto;
`;

export const TitleBlub = styled.h1`
	@import url('https://fonts.googleapis.com/css?family=Lora:400,700|Open+Sans:400,700&display=swap');
	color: white;
	text-align:center;
	font-family: 'Lora', serif;
	font-weight: bold;
	margin-bottom:8vh;
`;

export const Des_Blurb = styled.p`
	margin-top:8vh;
	color:white;
	font-family: 'Open Sans', sans-serif;
	font-size: 3vh;

`

export const ColoredLink = styled.a`
	color:white;
	font-weight: bold;
`

export const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
`;

export const StyledHlink = styled(Hlink)`
  color: white !important;
  font-family: 'Open Sans', sans-serif;
`;

export const Twitbut = styled.button`
	color:#00ACEE
	background:white;
	text-align: center;
	height: 3rem;
	font-size: 2vw;
	font-family: 'Open Sans', sans-serif;;
	width: 40vw;
	border-radius: 30px;
	margin:0 auto;
    display:block;
	&:hover {
    background:#00ACEE;
    color:white
  }

`;

export const Footer = styled.section`
	width:100vw
	height:4vh
	font-size: 1vw;
	background-color: #FFFFFF;
	vertical-align: bottom;
`

export const Footer_Link = styled.a`
	color: #AAAAAA"
`