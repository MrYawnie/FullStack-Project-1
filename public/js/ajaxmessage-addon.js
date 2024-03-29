// Function to add a single message row to the table
function addMessageToTable(item) {
    let table = document.getElementById("guestbooktable");
    let date = new Date(item.date);
    table.innerHTML += `<tr><td>${item.id}</td><td>${item.username}</td><td>${item.country}</td><td>${date.toLocaleString("fi-FI")}</td><td>${item.message}</td></tr>`;
}

document.getElementById("submitBtn").addEventListener("click", function (event) {
    event.preventDefault();
    const formData = {
        username: document.querySelector('input[name="username"]').value,
        country: document.querySelector('select[name="country"]').value,
        message: document.querySelector('textarea[name="message"]').value,
    };

    if (formData.username === "" || formData.message === "" || formData.country === "") {
        alert("Please fill in all fields");
        return;
    }

    fetch("/ajaxmessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            // Now, just add the new message
            addMessageToTable(data);
        })
        .then(() => {
            // Clear the form
            let form = document.querySelector("form");
            form.reset();
        })
        .catch(error => console.error("Error:", error));
});