import {onMounted, reactive} from "vue";

export function useProductsLogic() {
  let list: any = reactive([]);

  async function getCategories() {
    const requestBody = {
      query: `query {
        categories {
          _id
          name
        }
      }`
    }

    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json'},
      });
      const responseData: any = await response.json();

      console.log("SUCCESS ", responseData.data.categories)

      list.splice(0, list.length, ...responseData.data.categories);
    } catch (err) {
      console.log("ERROR ", err)
    }
  }

  onMounted(async () => {
    console.log("START MOUNTED")
    await getCategories();
    console.log("FINISH MOUNTED")
  })

  return {
    list
  }
}