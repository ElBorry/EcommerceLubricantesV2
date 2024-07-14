async function printDetailOptions() {
  let template = "";
  let online = await fetch("/api/sessions/online");
  online = await online.json();
  console.log(online);
  if (online.statusCode === 200) {
    template = `
        <div class="col">
            <div class="d-flex flex-row justify-content-evenly align-items-center">
                <div class="input-group-prepend">
                    <button type="button" class="btn btn-dark p-2" style="width:2rem;"
                    id="decrementBtn">-</button>
                </div>
                <span id="itemCount"></span>
                <div class="input-group-append">
                    <button type="button" class="btn btn-dark p-2" style="width:2rem;"
                    id="incrementBtn">+</button>
                </div>
            </div>
            <button class="m-3 p-2 text-center btn btn-primary bg-dark text-light" id="addCart">ADD TO
                CART</button>
        </div>
        `;
    document.querySelector("#addCartOpt").innerHTML = template;
  } else {
    template = `
            <h5>You must be loggued to add Products to Cart</h5>
        `;
    document.querySelector("#addCartOpt").innerHTML = template;
  }
}

export default printDetailOptions;
