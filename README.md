<h1>Full Article click <a href="https://ishare-app.web.app/article/NMH6HaNUqcqljIvbRZiy" rel="noopener noreferrer" target="_blank">here</a></h1>

<p>This module is used to query a single MongoDB collection written with mongoose dynamically with simple query parameters using MongoDB query types &#39;AND&#39; and &#39;OR&#39; with &nbsp;MongoDB filter options eg &#39;$gt&#39; as &#39;gt&#39;, &#39;$gte&#39; as &#39;gte&#39;, &#39;$lt&#39; as &#39;lt&#39;, &#39;$lte&#39; as &#39;lte&#39;, &#39;$eq&#39; as &#39;eq&#39; and &#39;cn&#39; for case insensitive query for contains replacing MongoDB regex expression eg &#39;/.*Will Abule.*/i&#39; you can also write your own MongoDB queries as expressions.</p>

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
  tags: {
    type: Array
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});
const Post = mongoose.model(&quot;Post&quot;, postScheama);
module.exports.postScheama = postScheama;
module.exports.Post = Post;</pre>

<p>
	<br>
</p>

<p><strong>post route file</strong></p><pre>router.get(&quot;/post&quot;, async (req, res) =&gt; {

try {
     const setect = &quot;\_id title userId description imageUrl&quot;
     const data = await Promise.all([ getResReq(req, res, Post, select) ]);
     if (data.type === &quot;error&quot;)
        return res.status(500).send({ message : `internal server error`, error: data })
res.send(data[0]);
  } catch {
    return res.status(500).send({ message : `internal server error`, error: data })
  }
});

</pre>

<p><strong><span style="color: rgb(209, 72, 65);">NOTE: As a backend developer you can write your own additional query eg from v1.0.5</span></strong></p><pre><span style="color: rgb(0, 0, 0);">const searchFilter = JSON.parse(req.query.searchFilters).rules;</span>
<span style="color: rgb(0, 0, 0);">const result = <span style="color: rgb(0, 0, 0);">searchFilter.push({</span></span>
   option: &quot;expression&quot;,
   filed: &quot;tags&quot;
   data: { $all: [&#39;red&#39;, &#39;blank&#39;] }
<span style="color: rgb(0, 0, 0);"><span style="color: rgb(0, 0, 0);">})</span></span>

<span style="color: rgb(0, 0, 0);"><span style="color: rgb(0, 0, 0);">// note any mongodb query will work just specify the query at the &quot;data&quot; and doc field at &quot;field &quot; and this can also be done from the client as well if you so which.</span></span></pre>

<p>
	<br>
</p>

<h3>From Client</h3>

<p>
	<br>
</p>

<p><strong><span style="color: rgb(184, 49, 47);">don&#39;t install the package for reading only if your backend developer uses this library&nbsp;</span></strong></p>

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

<p dir="ltr" style="margin-left: 240px;">ne (not equal)</p>

<p dir="ltr" style="margin-left: 240px;">gt (greater than)</p>

<p dir="ltr" style="margin-left: 240px;">gte (greater than or equal)</p>

<p dir="ltr" style="margin-left: 240px;">lt (less than)</p>

<p dir="ltr" style="margin-left: 240px;">lte (less than or equal)</p>

<p dir="ltr" style="margin-left: 240px;">in (in an array)</p>

<p dir="ltr" style="margin-left: 240px;">nin (not in an array)</p>

<p dir="ltr" style="margin-left: 240px;">range ( for querying data in range)</p>

<p dir="ltr" style="margin-left: 240px;">expression ( for writing your own MongoDB queries)</p>

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

<p dir="ltr">cn: (contains): can only be used for string values.</p>

<p dir="ltr">eq: (equal: operator matches documents where the value of a field equals the specified value.)</p>

<p dir="ltr">ne: (not equal: selects those documents where the value of the <code>field</code> is greater than (i.e. <code>&gt;</code>) the specified <code>value</code>.)</p>

<p dir="ltr">gt: (greater than: selects the documents where the value of the <code>field</code> is greater than or equal to (i.e. <code>&gt;=</code>) a specified value (e.g. <code>value</code>.))</p>

<p dir="ltr">gte: (greater than or equal: selects the documents where the value of the <code>field</code> is greater than or equal to (i.e. <code>&gt;=</code>) a specified value (e.g. <code>value</code>.))</p>

<p dir="ltr">lt: (less than: selects the documents where the value of the <code>field</code> is less than (i.e. <code>&lt;</code>) the specified <code>value</code>.)</p>

<p dir="ltr">lte: (less than or equal: selects the documents where the value of the <code>field</code> is less than or equal to (i.e. <code>&lt;=</code>) the specified <code>value</code>.)</p>

<p dir="ltr">in: (operator selects the documents where the value of a field equals any value in the specified array.l)</p>

<p dir="ltr">nin: (less than or equal: operator selects the documents whose <code>field</code> holds an array with <strong>no</strong> element equal to a value in the specified array (e.g. <code>&lt;value1&gt;</code>, <code>&lt;value2&gt;</code>, etc.).)</p>

<p dir="ltr">expression: ( for writing your own MongoDB queries)</p>

<p dir="ltr">range: this example will explain better&nbsp;</p>

<p dir="ltr">if I want to filter the list of posts where name is &#39;will&#39; and the date is greater than the date seven days ago but less than or equal to today date. This can be written as follows</p><pre dir="ltr">const searchFilters = {
    searchOption:&quot;OR&quot;,
    rules:[{
        field:&quot;name&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;date&quot;,
        type:&quot;range&quot;,
        data: [
            {
               option:&quot;gt&quot;,
               type:&quot;data&quot;,
               data: new Date(new Date().setDate(new Date().getDate() - 7))
            },
            {
               option:&quot;lte&quot;,
               type:&quot;date&quot;,
               data: new Date()
            },
        ]
    }]
}</pre>

<p><span style="color: rgb(184, 49, 47);"><strong>NOTE: The range type is an array with a max and min length of 2 and option and type can be omitted. &nbsp;</strong></span></p>

<p dir="ltr">
	<br>
</p>

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

<p dir="ltr"><span style="background-color: initial;">if you want the result to brought by 10 batches starting from page 1&nbsp;I will do something like this</span></p><pre dir="ltr"><span style="background-color: initial;">const query = {
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

<p><strong>pageSize (number):&nbsp;</strong>The batch was returned data found in the collections eg post collection</p>

<p><strong>records (number):&nbsp;</strong>The total records found in the collections eg post collection</p>

<p><strong>pageNumber (number):&nbsp;</strong>The page you specified records should start from in the collections eg post collection</p>

<p><strong>total (number):&nbsp;</strong>The number of pages in the collections eg post collection</p>

<p>
	<br>
</p>

<p>A useful example to help you combine query</p><pre dir="ltr">const searchFilters = {
    searchOption:&quot;AND&quot;,
    rules:[{
        field:&quot;title&quot;,
        option:&quot;cn&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;description&quot;,
        option:&quot;ne&quot;,
        type:&quot;string&quot;,
        data:&quot;test&quot;
    },{
        field:&quot;userId&quot;,
        option:&quot;eq&quot;,
        type:&quot;string&quot;,
        data:&quot;will&quot;
    },{
        field:&quot;tags&quot;,
        option:&quot;in&quot;, // or nin
        type:&quot;array&quot;,
        data:[&quot;is&quot;, 3, 12.2, true, new Date()]
    },{
        field:&quot;date&quot;,
        type:&quot;range&quot;,
        data: [
            {
               option:&quot;gte&quot;, // or gt
               type:&quot;data&quot;,
               data: new Date(new Date().setDate(new Date().getDate() - 7))
            },
            {
               option:&quot;lte&quot;,// or lt
               type:&quot;date&quot;,
               data: new Date()
            },
        ]
    }]
}</pre>
