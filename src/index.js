let results = document.getElementById("varer");
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

let generateItems = () => {
	return (results.innerHTML = shopItemsData
		.map((shopItem) => {
			let { id, img, name, price } = shopItem;
			return `
        <div id="${id}" class="vare">
        <h2>${name}</h2>
        <img src=${img} alt="">
        <p>${price}nok</p>
        <a onclick="addToCart(${id})" class="btn">Add to cart</a>
        </div>`;
		})
		.join(""));
};
generateItems();

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
};
