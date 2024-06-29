const socket = io();
socket.on("products", (data) => {
  const template = data
    .map(
      (each) =>
        ` <div class="col-lg-3 col-md-4 col-sm-6"> 
            <div class="card m-2" style="height: 25rem;"> 
                <div class="card-body"> 
                    <h6 class="m-2">${each.title}</h4> 
                    <img style="width: 60%; height: 50%" src="${each.photo}" alt="${each.id}"> 
                    <div>
                      <a 
                      class="p-3 text-center btn btn-primary bg-dark text-light mt-4"
                      href="/pages/details.html?id=${each._id}"
                      >Details</a>
                    </div>
                </div> 
            </div> 
        </div> `
    )
    .join(" ");
  document.querySelector("#products").innerHTML = template;
});


