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
let basket = JSON.parse(localStorage.getItem("data")) || [];

// generate the result of the search
let generateItem = () => {
	let input = document.getElementById("search");
	let filter = input.value.toUpperCase();
	let search = shopItemsData.filter((vare) => vare.name.toUpperCase() === filter);
	// diverging
	let html = search.reduce((acc, shopItem) => {
		let {id, img, name, price } = shopItem;
		return (
			acc + `
			<div id="${id}" class="vare">
			<img src=${img} alt="">
			<h2>${name}</h2>
			<p>${price}nok</p>
			<a onclick="addToCart(${id})" class="btn">Add to cart</a>
			</div>`
		);
	}, "");
	results.innerHTML = html;
};
/*
	return (results.innerHTML = search
		.map((shopItem) => {
			let { id, img, name, price } = shopItem;
			return `
            <div id="${id}" class="vare">
            <img src=${img} alt="">
            <h2>${name}</h2>
            <p>${price}nok</p>
            <a onclick="addToCart(${id})" class="btn">Add to cart</a>
            </div>`;
		})
		.join(""));
};
*/
generateItem();

let addToCart = (id) => {
	// let selectedItem = id;
	// let search = basket.find((vare) => vare.id === selectedItem.id);

	let search = basket.find((vare) => vare.id === id);

	if (search === undefined) {
		basket.push({
			// id: selectedItem.id,
			id: id,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	localStorage.setItem("data", JSON.stringify(basket));
};

let search = document.getElementById("search");
search.addEventListener("input", function (event) {
	if (event.ketCode === 13) {
		generateItem();
	}
});