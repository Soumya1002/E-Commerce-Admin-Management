async function fetchData() {
    try {
        const response = await axios.get('https://crudcrud.com/api/b1f13eb60c094137ab24318995d4f9e4/ItemOrders');
        const { data } = response;
        //console.log(response);

        for (let i = 0; i < data.length; i++) {
            await showOrderOnScreen(data[i]);
        }
    } catch (err) {
        console.error(err);
    }
}
fetchData();

async function submitOrder() {
    try {
        const price = document.getElementById('price').value;
        const product = document.getElementById('product').value;
        const category = document.getElementById('category').value;

        if(price==""||product==""||category==""){
            alert("Please enter valid details");
            return false;

        }

        const obj = {
            price: price,
            product: product,
            category: category
        };
     
        const response = await axios.post('https://crudcrud.com/api/b1f13eb60c094137ab24318995d4f9e4/ItemOrders', obj);
        const { data } = response;

     
        await showOrderOnScreen(data);      
        document.getElementById('price').value = '';
        document.getElementById('product').value = '';
        document.getElementById('category').value = '1';
    } catch (err) {
        console.error(err);
    }
}

async function showOrderOnScreen(order) {
    try {
        const orderElement = `<li id='${order._id}'>${order.price}-${order.product}
            <button onclick=deleteOrder('${order._id}') class="delete-buttons">Delete</button>
        </li>`;

        const parDiv = document.getElementById(`type-${order.category}-list`);
        parDiv.innerHTML += orderElement;
    } catch (err) {
        console.error(err);
    }
}

async function deleteOrder(_id) {
    try {       
        await axios.delete(`https://crudcrud.com/api/b1f13eb60c094137ab24318995d4f9e4/ItemOrders/${_id}`);     
       
        const elementToDelete = document.getElementById(`${_id}`);
        var result = confirm("Are you sure to delete?");
        if (result) {
            const par = elementToDelete.parentElement;
            par.removeChild(elementToDelete);
        }
    } catch (err) {
        console.error(err);
    }
}

