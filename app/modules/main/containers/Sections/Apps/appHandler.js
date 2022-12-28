function start() {
  const walletAnchor = document.querySelector('.connect-wallet');
  if (walletAnchor) {
    walletAnchor.click();
    clickOnLoginOnAppear();
  }
}

window.setTimeout(start, 1000);

function clickOnLoginOnAppear() {
  const buttons = document.querySelectorAll('.wallet-list li button');
  // filter button with text "Login"
  const button = Array.from(buttons).filter((btn) => btn.innerText.trim() === 'Newsafe')[0];
  console.log('buttons', buttons, button);
  if (button) {
    button.click();
    clickOnAnchorLoginOnAppear();
  } else {
    window.setTimeout(clickOnLoginOnAppear, 100);
  }
}

function clickOnAnchorLoginOnAppear() {
  const button = document.querySelector('.anchor-link-button');
  if (button) {
    button.click();
  } else {
    window.setTimeout(clickOnAnchorLoginOnAppear, 100);
  }
}