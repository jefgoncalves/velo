export function generateOrderNumber() {
    const prefix = 'VLO-';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + randomPart;
  }
  
  const orderNumber = generateOrderNumber();
  //console.log(orderNumber);

  