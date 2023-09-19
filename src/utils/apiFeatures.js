class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }
   search() {
      const location = this.queryStr
         ? {
              address: {
                 $regex: this.queryStr,
                 $options: "i",
              },
           }
         : {};
      this.query = this.query.find({ ...location });
      return this;
   }
}

export default ApiFeatures;
