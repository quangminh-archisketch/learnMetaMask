import styled from 'styled-components';

const Footer = () => {
  return (
    <Footer_wrapepr>
      <h3>Archisketch Company</h3>
      <p>
        Floor 10, Vinh Trung Plaza
        <br />
        257 Hung Vuong St., Da Nang City, Viet Nam
      </p>
    </Footer_wrapepr>
  );
};

const Footer_wrapepr = styled.div`
  padding: 30px 0;
  background-color: var(--color-gray-4);
  text-align: center;

  h3 {
    margin-bottom: 10px;
    font-weight: 600;
    color: var(--color-gray-11);
    font-size: 24px;
  }

  p {
    font-size: 16px;
    letter-spacing: 0.64px;
    color: var(--color-gray-9);
  }

  p,
  h3 {
    padding: 0 20px;
  }
`;

export default Footer;
