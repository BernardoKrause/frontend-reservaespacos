import styled from 'styled-components';

const ButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #004666;
    color: #fff;
    width: 324px;
    height: 96px;
    border: none;
    border-radius: 12px;
    font-size: 24px;

    &:hover {
        cursor: pointer;
    }
`

function Button({texto}) {
    return (
        <ButtonContainer>
            {texto}
        </ButtonContainer>
    );
}
 
export default Button;