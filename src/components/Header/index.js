import prefeituraLogo from '../../images/prefeitura-logo.png'
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    color: #004666;
`

function Header() {
    return (
        <HeaderContainer>
            <img src={prefeituraLogo} alt='logo'></img>
            <h1>Reserva de espaços esportivos</h1>
        </HeaderContainer>
    );
}
 
export default Header;