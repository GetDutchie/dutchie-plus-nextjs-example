import styled from "styled-components";
import Link from "next/link";

import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { mediaQueries } from "styles/media-queries";

export function HeroSection(): JSX.Element {
  return (
    <Container>
      <MainHero>
        <MainHeroContent>
          <DesktopOnly>
            <Subheader>shop our new products</Subheader>
          </DesktopOnly>
          <Header>Get festive with fall time sativas.</Header>
          <Link href="/menu" passHref>
            <ShopCTA>Shop Now</ShopCTA>
          </Link>
        </MainHeroContent>
        <BudImg src="images/hero-bud.png" />
      </MainHero>
      <Chocolates>
        <EdiblesSubheader>edibles</EdiblesSubheader>
        <EdiblesHeader>Chocolate lovers... eat your heart out.</EdiblesHeader>
      </Chocolates>
      <OnlineOrders>
        <DesktopOnly>
          <OnlineOrdersImage src="icons/online-order.svg" />
        </DesktopOnly>
        <MobileOnly>
          <OnlineOrdersImage src="icons/online-order-small.svg" />
        </MobileOnly>
        <OnlineOrdersSubheader>order now</OnlineOrdersSubheader>
        <OnlineOrdersHeader>
          Order online for express checkout
        </OnlineOrdersHeader>
        {/* TODO: update href when we have locations functionality */}
        <Link href="/" passHref>
          <OnlineOrdersCTA>See our locations</OnlineOrdersCTA>
        </Link>
      </OnlineOrders>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 11px;
  grid-template-rows: 815px 514px;
  grid-template-columns: minmax(auto, 65%) minmax(auto, 35%);
  padding: 0 29px;

  @media ${mediaQueries.largePhone} {
    grid-template-columns: 100%;
    grid-template-rows: 1fr;
    gap: 5px;
    padding: 0;
  }
`;

const Chocolates = styled.div`
  background: url("images/chocolates.png");
  background-size: 953px 514px;
  background-position: center;
  display: inline-block;
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;

  @media ${mediaQueries.largePhone} {
    height: 400px;
    background-position: -240px;
    background-size: 800px 401px;
    padding: 50px 29px;
  }
`;

const EdiblesSubheader = styled.div`
  // this is the only instance of Lato font i see in the specs. maybe we can just keep it poppins
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #f0c7bb;
  margin-bottom: 12px;
`;

const EdiblesHeader = styled.div`
  font-family: "Playfair Display";
  font-weight: 700;
  font-size: 35px;
  color: #ffffff;
  width: 450px;

  @media ${mediaQueries.tablet} {
    font-size: 32px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 30px;
    width: 305px;
  }
`;

const OnlineOrders = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: url("images/order-online-bg.png");
  background-size: 481px 514px;
  padding: 80px 45px 71px;

  @media ${mediaQueries.tablet} {
    padding: 80px 30px 70px;
  }

  @media ${mediaQueries.largePhone} {
    padding: 50px 67px;
  }
`;

const OnlineOrdersImage = styled.img`
  display: inline-block;
  margin-bottom: 33px;
`;

const OnlineOrdersSubheader = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #f0c7bb;
  margin-bottom: 12px;
`;

const OnlineOrdersHeader = styled.div`
  font-family: "Playfair Display";
  font-weight: 700;
  font-size: 35px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 37px;

  @media ${mediaQueries.tablet} {
    font-size: 32px;
  }

  @media ${mediaQueries.largePhone} {
    font-size: 30px;
    width: 300px;
  }
`;

const OnlineOrdersCTA = styled.a`
  border: 1px solid #e7b9ab;
  color: #e7b9ab;
  padding: 15px 32px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    color: #ffffff;
  }
`;

const MainHero = styled.div`
  background: url("images/hero-background.png");
  background-size: 481px 408px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 109px;
  padding-right: 60px;
  grid-row: 1 / 1;
  grid-column: 1 / 3;
  overflow: hidden;
  position: relative;

  @media ${mediaQueries.largePhone} {
    padding: 52px 25px 0;
    grid-column: 1 / 1;
    height: 500px;
    align-items: flex-start;
  }
`;

const MainHeroContent = styled.div`
  z-index: 2;
`;

const Subheader = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 11px;
`;

const Header = styled.div`
  font-family: "Playfair Display";
  font-weight: 700;
  font-size: 69px;
  color: #ffffff;
  width: 575px;
  margin-bottom: 50px;

  @media ${mediaQueries.largePhone} {
    font-size: 45px;
    width: 275px;
  }
`;

const BudImg = styled.img`
  width: 640px;
  position: absolute;
  bottom: 0;
  right: 40px;

  @media ${mediaQueries.tablet} {
    right: 20px;
    width: 400px;
  }

  @media ${mediaQueries.largePhone} {
    right: -80px;
    width: 300px;
  }
`;

const ShopCTA = styled.a`
  background-color: #c15c5c;
  color: white;
  padding: 18px 63px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;

  @media ${mediaQueries.largePhone} {
    padding: 13px 38px;
  }

  &:hover {
    background-color: #b55555 !important;
  }
`;
