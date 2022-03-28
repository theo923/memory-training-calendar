import styled, { css } from "styled-components";
import { AnyProps, any } from "../styled-system";
import { useContext } from 'react'
import { UserContext } from 'components/User';

interface Props extends AnyProps {
	round?: boolean
}

const StyledGlassBox = styled.div<Props>`
	z-index: 1;
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
  position: relative;
  overflow: hidden;
	${({ round }) => css`
  	border-radius: ${round === true ? '30px' : '0'};
	`}
  background: inherit;
	
	&:before {
		content: "";
		position: absolute;
		filter: blur(10px);
		box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
		background: inherit;
		margin: -20px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	} 

	${any}
`;

const StyledGlassBlackBox = styled.div<Props>`
	z-index: 1;
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
  position: relative;
  overflow: hidden;
	${({ round }) => css`
  	border-radius: ${round === true ? '30px' : '0'};
	`}
  background: inherit;
	
	&:before {
		content: "";
		position: absolute;
		filter: blur(10px);
		box-shadow: inset 0 0 2000px rgba(0, 0, 0, .5);
		background: #1C1C1C;
		margin: -20px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	} 

	${any}
`;

const GlassBox = ({ disabled, ...props }: any): JSX.Element => {
	const { userSettings: { tertiary_colorValue } } = useContext(UserContext)
	return (
		<>
			{tertiary_colorValue === 'white' ?
				<StyledGlassBlackBox {...props} color={tertiary_colorValue}>{props.children}</StyledGlassBlackBox>
				:
				<StyledGlassBox {...props} color={tertiary_colorValue}>{props.children}</StyledGlassBox>
			}
		</>
	);
};

export default GlassBox;
