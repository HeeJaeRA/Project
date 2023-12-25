<template>
	<div>
		<table ref="myDataTable" class="display">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in data" :key="index">
					<td>{{ item.name }}</td>
					<td>{{ item.email }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

export default {
	data() {
		return {
			data: [
				{ name: 'John Doe', email: 'john@example.com' },
				{ name: 'Jane Doe', email: 'jane@example.com' },
			],
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.initDataTable();
		});
	},
	methods: {
		initDataTable() {
			$(this.$refs.myDataTable).DataTable({});
		},
	},
};
</script>
