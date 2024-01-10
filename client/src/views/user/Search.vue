<template>
	<div>
		<form class="d-flex" action="#" method="POST" @submit.prevent="goToSearch">
			<select v-model="selectedOption">
				<option value="title">제목</option>
				<option value="author">작성자</option>
				<option value="content">내용</option>
			</select>
			<input
				v-model="searchTerm"
				style="width: 800px"
				class="form-control me-sm-2"
				type="search"
				placeholder="Search"
				name="word"
			/>
			<button type="submit" class="btn btn-secondary my-2 my-sm-0">Search</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedOption: 'title', // Default selected option
			searchTerm: '', // Holds the value of the search term
		};
	},
	methods: {
		goToSearch() {
			// Here, you can perform an action like making an API call with the selectedOption and searchTerm values
			// For example, using axios:
			// axios.post('/node/search', { where: this.selectedOption, content: this.searchTerm })
			//    .then(response => {
			//        // Handle the response here
			//    })
			//    .catch(error => {
			//        // Handle errors
			//    });

			// For now, let's log the selectedOption and searchTerm to the console
			console.log('Selected Option:', this.selectedOption);
			console.log('Search Term:', this.searchTerm);
		},
	},
};
</script>
