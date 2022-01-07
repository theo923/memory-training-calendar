import styled from "styled-components";
import { AnyProps, any } from "../styled-system";

const GlassBox = styled.div<AnyProps>`
	z-index: 1;
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  background: rgba(255, 255, 255, .3);
	
	&:before {
		content: "";
		position: absolute;
		filter: blur(10px);
		box-shadow: inset 0 0 2000px rgba(255, 255, 255, .2);
		background: rgba(255, 255, 255, .3);
		margin: -20px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	} 

	${any}
`;

export default GlassBox;
