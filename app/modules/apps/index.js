let retries = 10;
function start() {
  const walletAnchor = document.querySelector('.connect-wallet');
  if (walletAnchor) {
    walletAnchor.click();
    console.log('login button clicked');
    clickOnLoginOnAppear();
  } else if (retries > 0) {
    retries -= 1;
    console.log(`retrying click on login button, retries left ${retries}`);
    window.setTimeout(start, 100);
  } else {
    console.log('failed to click on login button');
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
