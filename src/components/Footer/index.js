import prefeituraLogo from '../../images/prefeitura-logo.png'
import secuteLogo from '../../images/secute-logo.png'
import styled from 'styled-components';

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #004666;
    width: 100%;
    color: #fff;
    padding: 2vh 0;
`

const FooterPrefeituraLogo =  styled.img`
    border-radius: 40px;
`

const FooterPrefeituraInfo = styled.div`
    text-align: left;
`

const FooterSECUTELogo = styled.img `
    border-radius: 12px;
`

function Footer() {
    return (
        <FooterContainer>
            <div>
                <FooterPrefeituraLogo src={prefeituraLogo} alt='Prefeitura Logo'/>
            </div>
            <FooterPrefeituraInfo>
                Parque Getúlio Vargas, 01 - Centro, Alegre - ES, 29500-000
                <br/>
                telefone: (28) 3552-1213
            </FooterPrefeituraInfo>
            <div>
                <FooterSECUTELogo src={secuteLogo} alt='SECUTE Logo'/>
                <p>Administrado por: Secretaria de Cultura e Esporte (SECUTE)</p>
            </div>
        </FooterContainer>
    );
}
 
export default Footer;