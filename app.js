const text_field = document.querySelector("input[type='text']");
const button = document.querySelector("input[type='button']");
const name_span = document.querySelector("#name");
const adress_span = document.querySelector("#address");
const key = "t0GZcGYb3GuxKe9gvrowWqnMMXxVOosptKLq05sC";

button.addEventListener("click", () => {
    let reg_num = text_field.value.trim();

    fetch(`https://api.companieshouse.gov.uk/company/${reg_num}`, {
        headers: new Headers({
            Authorization: `Basic ${btoa(key)}`
        })
    })
        .then(response => response.json())
        .then(company => {
            let name = company.company_name.toUpperCase();
            let address = Object.values(company.registered_office_address).join(", ");

            name_span.innerText = name;
            adress_span.innerText = address;
        })
        .catch(() => {
            name_span.innerText = "";
            adress_span.innerText = "";
            alert("This company doesn't exist!");
        });
});
