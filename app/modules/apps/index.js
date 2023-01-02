/* eslint-disable no-await-in-loop */
async function wait(ms) {
  // eslint-disable-next-line compat/compat
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  let retries = 5;
  while (retries > 0) {
    try {
      const userMenu = document.querySelector('.user-menu');
      if (userMenu) {
        break;
      }
      await clickOnConnect();
      await clickOnNewsafe();
      await clickOnConnectNewsafe();
      break;
    } catch (e) {
      console.error(e);
      console.error('Retries left...', retries);
      retries -= 1;
    }
  }
  if (retries === 0) {
    console.error('Could not connect to Newsafe automatically');
  }
}

main();

async function clickOnConnect() {
  await wait(1000);
  const connectButton = document.querySelector('.connect-wallet');
  if (connectButton) {
    connectButton.click();
  } else {
    throw new Error('Connect button not found');
  }
}


async function clickOnNewsafe() {
  let retries = 5;
  while (retries > 0) {
    await wait(300);
    const buttons = document.querySelectorAll('.wallet-list li button');
    const button = Array.from(buttons).filter((btn) => btn.innerText.trim() === 'Newsafe')[0];
    if (button) {
      button.click();
      break;
    }
    retries -= 1;
  }
  if (retries === 0) {
    throw new Error('Newsafe button not found');
  }
}

async function clickOnConnectNewsafe() {
  let retries;
  for (retries = 0; retries < 5; retries += 1) {
    await wait(300);
    const connectButton = document.querySelector('.anchor-link-button');
    if (connectButton) {
      connectButton.click();
      break;
    }
  }
}
