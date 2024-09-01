const checkoutRepository = async (filter) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let productsOnCart = await cartsManager.read(filter);
    console.log("Products on cart:", productsOnCart);
    productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url = "http://localhost:8080/thanks.html";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) { throw error }
 };
 export default checkoutRepository;