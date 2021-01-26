import { useState, useRef, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useApollo } from "api/apollo";
import { Logo } from "components/shared/svg/logo";
import { MobileMenuIcon } from "components/shared/svg/mobile-menu-icon";
import { CloseButton } from "components/shared/svg/close-button";
import { CartIcon } from "components/shared/svg/cart-icon";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";

import { NavProps } from "./index";
import { Cart } from "./cart/index";

const NAV_HEIGHT = "76px";

export function MobileNav(props: NavProps): JSX.Element {
  const { darkBackground, page } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const baseNavBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);

  const checkoutItemsCount = checkout?.items.length || 0;

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogoClick() {
    router.push("/");
  }

  function handleShopClick() {
    if (page === "menu") {
      setIsMenuOpen(false);
    } else {
      router.push("/menu");
    }
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <>
      <Container darkBackground={darkBackground} ref={baseNavBarRef}>
        <Logo
          isDark={!darkBackground}
          height={58}
          width={116}
          onClick={handleLogoClick}
        />
        {isMenuOpen ? (
          <CloseButton isDark={!darkBackground} onClick={closeMenu} />
        ) : (
          <MobileMenuIcon isDark={!darkBackground} onClick={openMenu} />
        )}
      </Container>
      {/* SHOP MENU */}
      <StyledMenu
        open={isMenuOpen && !isCartOpen}
        anchorEl={baseNavBarRef.current}
        hideBackdrop
        elevation={0}
        transitionDuration={0}
        style={{ marginTop: NAV_HEIGHT }}
      >
        <LoginAndCartSection>
          Customer Login
          <CartIconContainer>
            <CartCount>
              {loading ? (
                <LoadingSpinner size={8} color="#ffffff" />
              ) : (
                checkoutItemsCount
              )}
            </CartCount>
            <CartIcon onClick={openCart} />
          </CartIconContainer>
        </LoginAndCartSection>
        <StyledMenuItem onClick={handleShopClick}>
          Shop
          <Chevron
            direction={ChevronDirection.Right}
            color="#1F2B49"
            height={16}
            width={16}
          />
        </StyledMenuItem>
        <StyledMenuItem>Find a Location</StyledMenuItem>
        <StyledMenuItem>Cannabis Corner</StyledMenuItem>
        <StyledMenuItem>Specials</StyledMenuItem>
        <StyledMenuItem>North Rewards</StyledMenuItem>
        <StyledMenuItem>Refer a Friend</StyledMenuItem>
      </StyledMenu>
      {/* CART  */}
      <StyledMenu
        open={isCartOpen}
        anchorEl={baseNavBarRef.current}
        hideBackdrop
        elevation={0}
        transitionDuration={0}
      >
        <Cart onClose={closeCart} apolloClient={apolloClient} />
      </StyledMenu>
    </>
  );
}

const Container = styled.div<{ darkBackground?: boolean }>`
  z-index: 3;
  height: ${NAV_HEIGHT};
  width: 100%;
  padding: 0 25px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${(props) => (props.darkBackground ? "#ffffff" : "#1F2B49")};
  background-color: ${(props) =>
    props.darkBackground ? "#322F46" : "#ffffff"};
`;

const StyledMenu = styled(Menu)`
  & .MuiMenu-paper {
    border-radius: 0;
    height: 100% !important;
    max-height: 100% !important;
    width: 100%;
    left: 0 !important;
    top: 0 !important;
    max-width: 1440px;
    background-color: #ffffff;
  }

  & .MuiList-root {
    padding: 0;
  }
`;

const LoginAndCartSection = styled.div`
  background-color: #232133;
  color: #ffffff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 13px;
  padding: 0 25px;
`;

const StyledMenuItem = styled(MenuItem)`
  height: 88px;
  border-bottom: 1px solid #d9d6d2;
  font-size: 18px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }
`;

const CartIconContainer = styled.div`
  position: relative;
  margin-right: 8px;
`;

const CartCount = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 100%;
  background-color: #f4bd33;
  font-size: 11px;
  font-weight: 700;
  top: -11px;
  right: -22px;
  color: #ffffff;
`;
