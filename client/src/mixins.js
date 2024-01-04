export default {
  methods: {
    $dateFormat(val) {
      let date = val == "" ? new Date() : new Date(val);
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },
  },
};
