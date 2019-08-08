<h1>Full Article click <a href="https://teamishare.com/article/NMH6HaNUqcqljIvbRZiy">here</a></h1>

<p>This module is used to query a single &nbsp;mongodb collection written with mongoose dynamically with simple query parameters using mongodb query types &#39;AND&#39; and &#39;OR&#39; with &nbsp;MongoDB filter options eg &#39;$gt&#39; as &#39;gt&#39;, &#39;$gte&#39; as &#39;gte&#39;, &#39;$lt&#39; as &#39;lt&#39;, &#39;$lte&#39; as &#39;lte&#39;, &#39;$eq&#39; as &#39;eq&#39; and &#39;cn&#39; for case insensitive query for contains replacing MongoDB regex expression eg &#39;/.*Will Abule.*/i&#39;.&nbsp;</p>

<p>The client(s) consuming your API just has to follow simple roles or better a query structure and it dynamically query and return an object as the result containing five fields data, pageSize, records, pageNumber, and total.</p>

<p>data representing the queried data, pageSize representing the bash of data returned, records representing the total records found based on the filter, pageNumber representing the current paginated page, and total representing the number of pages.</p>
<h2>How To Use</h2>

<p>
	<br>
</p>

<h3>Example</h3>

<h3>Form your Node App</h3>

<p>
	<br>
</p><pre>run npm i -s mongodb-collection-query-with-mongoose</pre>

<p>
	<br>
</p>

<p><strong>Post model file</strong></p><pre>const mongoose = require(&quot;mongoose&quot;);
const postScheama = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String
  },
});
const Post = mongoose.model(&quot;Post&quot;, postScheama);
module.exports.postScheama = postScheama;
module.exports.Post = Post;</pre>

<p>
	<br>
</p>

<p><strong>post route file</strong></p><pre>const getResReq = require(&quot;mongodb-collection-query-with-mongoose&quot;);
const { Post } = require(&quot;./post-model&quot;);
const express = require(&quot;express&quot;); 
const router = express.Router();

router.get(&quot;/post&quot;, [authGaurd], async (req, res) =&gt; { 
   const setect = &quot;\_id title userId description imageUrl&quot;
   const data = await Promise.all([ getResReq(req, res, Post, select) ]); 
   if (data.type === "error") return res.status(500).send({ message : `internal server error`, error: data})
   res.send(data[0])
});</pre>

<br>

<h3>From Client</h3>

<p>
	<br>
</p>

<p><strong><span style="color: rgb(184, 49, 47);">don&#39;t install the package for reading only if your backend developer uses this library </span></strong></p>

<p>
	<br>
</p>

<p><strong>filter (boolean):&nbsp;</strong>If you want the collection to filtered or not, if true the search filter is required</p>

<p><strong>pageSize (number):&nbsp;</strong>The page size that is the number of bashes you want records to be sent</p>

<p><strong>&nbsp;pageNumber (number):&nbsp;</strong>The page <strong>&nbsp;</strong>from the filtered collection</p>

<p><strong>sortName (string):&nbsp;</strong>What field in the document to want the result to be sorted with eg a collection of users can be sorted by fristName <strong>&nbsp;</strong></p>

<p><strong>so</strong><strong>rt (string):&nbsp;</strong>the sort order either ascending as &#39;asc&#39; or descending as &#39;desc&#39;</p>

<p><strong>searchFilter (string):&nbsp;</strong>a stringified object with the following fields: searchOption, and rules</p>

<p style="margin-left: 140px;"><strong>searchOption:&nbsp;</strong>either &#39;AND&#39; or &#39;OR&#39; in uppercase. AND will return data if all search rules evaluate to true, &#39;OR&#39; will return data if all one or multiple of the rules are set to true.</p>

<p style="margin-left: 140px;"><strong>rules:&nbsp;</strong>An array of objects, each object must have the following fields</p>

<p style="margin-left: 180px;"><strong>field:&nbsp;</strong>The document field</p>

<p style="margin-left: 180px;"><strong>option:&nbsp;</strong>how you want it to be quired. This is to be set to either the following&nbsp;</p>

<p dir="ltr" style="margin-left: 240px;">cn (contains)</p>

<p dir="ltr" style="margin-left: 240px;">eq (equal)</p>

<p dir="ltr" style="margin-left: 240px;">gt (greater than)</p>

<p dir="ltr" style="margin-left: 240px;">gte (greater than or equal)</p>

<p dir="ltr" style="margin-left: 240px;">lt (less than)</p>

<p dir="ltr" style="margin-left: 240px;">lte (less than or equal)</p>

<p dir="ltr" style="margin-left: 240px;">
	<br>
</p>

<p dir="ltr" style="margin-left: 180px;"><strong>data:&nbsp;</strong>The value of the field</p>

<p dir="ltr" style="margin-left: 180px;"><strong>type:&nbsp;</strong>The data type of the data. it must be set to either of the following</p>

<p dir="ltr" style="margin-left: 220px;">number</p>

<p dir="ltr" style="margin-left: 220px;">float</p>

<p dir="ltr" style="margin-left: 220px;">string</p>

<p dir="ltr" style="margin-left: 220px;">date</p>

<p dir="ltr" style="margin-left: 220px;">boolean</p>

<p dir="ltr">
	<br>
</p>

<p dir="ltr"><strong>query filter rules</strong></p>

<p dir="ltr">cn (contains): can only be used for string values</p>

<p dir="ltr">eq (equal): can be used for the following string, date, boolean float, number</p>

 <p dir="ltr">gt (greater than): can be used for the following string, date, boolean float, number</p>

 <p dir="ltr">gte (greater than or equal): can be used for the following string, date, boolean float, number</p>

 <p dir="ltr">lt (less than): can be used for the following string, date, boolean float, number</p>

<p dir="ltr">lte (less than or equal): can be used for the following string, date, boolean float, number</p>

<p dir="ltr">
	<br>
</p>

<p dir="ltr"><strong>Example</strong> So if you want to query a collection of users that the name or the email &nbsp;contains will</p><pre dir="ltr">const searchFilters = {
    searchOption:&quot;OR&quot;,
    rules:[{
        field:&quot;name&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;email&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    }]
}</pre>

<p>if you want to query a collection of post that the title or the description contains will and userId is 1234&nbsp;</p><pre dir="ltr">const searchFilters = {
    searchOption:&quot;AND&quot;,
    rules:[{
        field:&quot;title&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;description&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;userId&quot;,
        option:&quot;eq&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    }]
}</pre>

<p dir="ltr"><span style="background-color: initial;">if you want to sort the result in a descending by name then I will do something like this</span></p><pre>const query = {
    sort          : &#39;desc&#39;,
    sortName      : &#39;title&#39;,
}</pre>

<p dir="ltr"><span style="background-color: initial;">if you want to the result to be filtered I will do something like this</span></p><pre dir="ltr"><span style="background-color: initial;">const query = {
    filter        : true,</span>
<span style="background-color: initial;">    searchFilters : JSON.stringify(searchFilters)
}</span></pre>

<p>
	<br>
</p>

<p dir="ltr"><span style="background-color: initial;">if you want the result to brought by 10 batches starting from page 1</span><span style="background-color: initial;">&nbsp;I will do something like this</span></p><pre dir="ltr"><span style="background-color: initial;">const query = {
    pageNumber : 1,</span>
<span style="background-color: initial;">    pageSize : 10
}</span></pre>

<p>
	<br>
</p>

<p>so the end result will look like this</p><pre dir="ltr">const searchFilters = {
    searchOption:&quot;AND&quot;,
    rules:[{
        field:&quot;title&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;description&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;userId&quot;,
        option:&quot;eq&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    }]
}</pre><pre>const query = {
<span style="background-color: initial;">    filter        : true,</span>
<span style="background-color: initial;">    pageNumber    : 1,</span>
<span style="background-color: initial;">    pageSize      : 10</span>
    sort          : &#39;desc&#39;,
    sortName      : &#39;title&#39;,
<span style="background-color: initial;">    searchFilters : JSON.stringify(searchFilters)</span>
}</pre>

<p>
	<br>
</p>

<p>Result for the API will look like this</p><pre dir="ltr">Result : {
    data: array,
    pageSize: array,
    records: number,
    pageNumber: number,
    total: number
}</pre>

<p>
	<br>
</p>

<p><strong>data (array):&nbsp;</strong>The data found in the collections eg post collection</p>

<p><strong>pageSize (number):&nbsp;</strong>The batch the was returned data found in the collections eg post collection</p>

<p><strong>records (number):&nbsp;</strong>The total records found in the collections eg post collection</p>

<p><strong>pageNumber (number):&nbsp;</strong>The page you specified records should start from in the collections eg post collection</p>

<p><strong>total (number):&nbsp;</strong>The number of pages in the collections eg post collection</p>

<p>
	<br>
</p>
