import { useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "styles/media-queries";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

export function Footer(): JSX.Element {
  const [email, setEmail] = useState("");

  return (
    <Container>
      <Header>Join our secret society</Header>
      <Subheader>
        Join our mailing list to learn about specials and new products arriving
        at North Cannabis.
      </Subheader>

      {/* TODO */}
      <EmailContainer>
        <EmailInput
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <img src="icons/right-arrow-circle.svg" />
            </InputAdornment>
          }
        />
      </EmailContainer>

      <LinkListsContainer>
        <LinkList>
          <LinkListItem>Shop</LinkListItem>
          <LinkListItem>North Rewards</LinkListItem>
          <LinkListItem>Refer a Friend</LinkListItem>
          <LinkListItem>Cannabis Corner</LinkListItem>
          <LinkListItem>Specials</LinkListItem>
          <LinkListItem>Visit the Dispensary</LinkListItem>
        </LinkList>
        <LinkList>
          <LinkListItem>Current Openings</LinkListItem>
          <LinkListItem>Privacy</LinkListItem>
          <LinkListItem>Terms</LinkListItem>
          <LinkListItem>Legal Stuff</LinkListItem>
        </LinkList>
      </LinkListsContainer>

      <SocialLinksList>
        <SocialLinksListItem>
          <img src="icons/social/facebook.svg" />
        </SocialLinksListItem>
        <SocialLinksListItem>
          <img src="icons/social/instagram.svg" />
        </SocialLinksListItem>
        <SocialLinksListItem>
          <img src="icons/social/pinterest.svg" />
        </SocialLinksListItem>
        <SocialLinksListItem>
          <img src="icons/social/twitter.svg" />
        </SocialLinksListItem>
      </SocialLinksList>

      <Copyright>2020 North Cannabis | All Rights Reserved.</Copyright>
    </Container>
  );
}

const Container = styled.footer`
  background-color: rgba(248, 245, 240, 0.56);
  padding: 120px 0 150px;
  @media ${mediaQueries.phone} {
    padding: 62px 27px 45px;
  }
`;

const Header = styled.h2`
  font-size: 35px;
  font-weight: 700px;
  text-align: center;
  margin-botton: 20px;
  font-family: "Playfair Display";

  @media ${mediaQueries.phone} {
    font-size: 30px;
    margin-bottom: 17px;
  }
`;

const Subheader = styled.p`
  text-align: center;
  font-size: 14px;
  width: 430px;
  margin: 0 auto 43px;
  line-height: 25px;
  font-weight: 300;

  @media ${mediaQueries.phone} {
    width: 100%;
    margin-bottom: 35px;
  }
`;

const EmailContainer = styled.div`
  text-align: center;
  margin-bottom: 70px;

  @media ${mediaQueries.phone} {
    margin-bottom: 50px;
  }
`;

const LinkListsContainer = styled.div`
  margin-bottom: 90px;
  @media ${mediaQueries.phone} {
    padding: 0 14px;
  }
`;

const LinkList = styled.ul`
  text-align: center;
  padding: 0;
  margin-bottom: 28px;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media ${mediaQueries.phone} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    row-gap: 25px;
    margin-bottom: 50px;
  }
`;

const LinkListItem = styled.li`
  cursor: pointer;
  display: inline;
  margin-right: 43px;
  font-size: 13px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

const SocialLinksList = styled.ul`
  text-align: center;
  padding: 0;
  margin-bottom: 28px;
`;

const SocialLinksListItem = styled.li`
  display: inline;

  margin-right: 43px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 11px;
`;

const EmailInput = styled(OutlinedInput)`
  &.MuiInputBase-root {
    width: 600px;
    padding: 6px 10px;
    border-radius: 0;
    background-color: #ffffff;
    box-shadow: 0px 3px 4px #e1ddd7;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  @media ${mediaQueries.phone} {
    &.MuiInputBase-root {
      width: 100%;
      font-size: 13px;
    }
  }
`;
