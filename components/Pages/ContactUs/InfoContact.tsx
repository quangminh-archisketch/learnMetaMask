import styled from 'styled-components';

const InfoContact = () => {
  return (
    <Wrapper>
      <h4>Address:</h4>
      <p>
        Floor 10 Vinh Trung Plaza <br />
        257 Hung Vuong Street <br />
        Da Nang City <br />
        Viet Nam
      </p>
      <h4>Customer support</h4>
      <p>
        <a href='mailto:support@vrstyler.com'>support@vrstyler.com</a>
      </p>
      <span>
        Please note that our Support team works Monday to Friday, so requests sent out of business
        hours and on the weekend might take longer than usual.
      </span>
    </Wrapper>
  );
};
export default InfoContact;

const Wrapper = styled.section`
  h4 {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-title);
  }
  h4 + p {
    font-size: 16px;
    color: var(--text-caption);
  }
  h4 ~ h4 {
    margin-top: 30px;
  }
  span {
    display: inline-block;
    max-width: 430px;
    margin-top: 10px;
    font-size: 14px;
    color: var(--text-caption);
  }
`;
