const base_url = "http://localhost:3000/pups"

fetch(base_url)
.then(res => res.json())
.then(data => {
    data.forEach(el => renderDoggos(el))

    const filterBtn = document.getElementById("filter-div");
    let isGoodFilter;
    filterBtn.addEventListener("click", e => {
    if (e.target.textContent === "Filter good dogs: OFF"){
        e.target.textContent = "Filter good dogs: ON";
        isGoodFilter = true;
    } else {
        e.target.textContent = "Filter good dogs: OFF";
        isGoodFilter = false;
    }
    const dogBar = document.getElementById("dog-bar");
    const filteredDogArray = [];
    data.forEach(el => {
        if(el.isGoodDog === isGoodFilter){
            filteredDogArray.push(el)
        }
    })
    dogBar.innerHTML = ""
    filteredDogArray.forEach(el => renderDoggos(el));
    
})
})

function renderDoggos(dogs){
    const span = document.createElement("span");
    span.textContent = dogs.name;
    document.getElementById("dog-bar").append(span);

    span.addEventListener("click", e => {
        document.getElementById("dog-info").innerHTML = "";
        console.log(dogs)
        renderSelectedDog(dogs);
    })
}

function renderSelectedDog(selectedDog) {
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const btn = document.createElement("button");

    img.src = selectedDog.image;
    h2.textContent = selectedDog.name;
    btn.textContent = (selectedDog.isGoodDog) ? "Good Dog!" : "Bad Dog!";

    document.getElementById("dog-info").append(h2, img, btn)
    let isGood;

    btn.addEventListener("click", () => {
        if(btn.textContent === "Good Dog!") {
            btn.textContent = "Bad Dog!"
            isGood = false;
        } else {
            btn.textContent = "Good Dog!"
            isGood = true;
        }

        fetch(`${base_url}/${selectedDog.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                isGoodDog: isGood
            })
        })
        .then(res => res.json())
        .then(console.log)
    })
}

