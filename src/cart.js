let basket = JSON.parse(localStorage.getItem("data")) || [];
let shopItemsData = [
	{
		id: "dr_pepper",
		name: "Dr Pepper",
		price: 26.90,
		img: "../images/drPepper2.png",
	},
	{
		id: "apjuice",
		name: "Sunniva Appelsin Juice",
		price: 20.00,
		img: "../images/Appelsinjuice.png",
	},
	{
		id: "norvegia",
		name: "Norvegia",
		price: 64.00,
		img: "../images/norvegia.png",
	},
];

let items = document.getElementById("items");

let generateItems = () => {
	return (items.innerHTML = basket
		.map((basketItem) => {
			let { id, item } = basketItem;
			let { img, name, price } = shopItemsData.find((x) => x.id === id);
			let search = basket.find((x) => x.id === id) || [];
			return `
        <div id="${id}" class="vare">
        <img src=${img} alt="">
        <h2>${name}</h2>
        <p>${(price * item).toFixed(2)}nok</p>
        <p class="amount">Amount: ${search.item === undefined ? 0 : search.item}</p>
        <a onclick="decrement(${id})" class="btn">-</a>
        <a onclick="addToCart(${id})" class="btn">+</a>
        </div>`;
		})
		.join(""));
};
generateItems();

let decrement = (id) => {
	let selectedItem = id;
	let search = basket.find((x) => x.id === selectedItem.id);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}
	basket = basket.filter((x) => x.item !== 0);
	localStorage.setItem("data", JSON.stringify(basket));
	generateItems();
	generateTotal();
};

let addToCart = (id) => {
	let selectedItem = id;
	let search = basket.find((vare) => vare.id === selectedItem.id);

	if (search === undefined) {
		basket.push({
			id: selectedItem.id,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	localStorage.setItem("data", JSON.stringify(basket));
	generateItems();
	generateTotal();
};

let total = document.getElementById("total");

let generateTotal = () => {
	let totalSum = basket.reduce((acc, cur) => {
		let { price } = shopItemsData.find((x) => x.id === cur.id);
		return acc + price * cur.item;
	}, 0);
	if (totalSum === 0)
		return (total.innerHTML = `
    <p>Your cart is empty<p>
    <a href="../pages/index.html" class="checkout-button btn" id="checkout-button">To store</a>
    
    `);
	return (total.innerHTML = `
    <p>Total: ${totalSum.toFixed(2)}nok<p>
    <a onClick="checkout()" href="../pages/success.html" class="checkout-button btn" id="checkout-button">Checkout</a>
    `);
};
generateTotal();

let checkout = () => {
	localStorage.clear();
	basket = [];
	generateItems();
	generateTotal();
};
