function loadMaps(){
	
	maps=new Array();
	maps.push("[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1],[1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,2,2,1],[2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2],[1,1,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2],[1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1]]");
	maps.push("[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,2,2,2,2,1,2,2,1,1,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,2,2,1,1,1,1,1,1,2,2,1,1,1,1,2,2],[2,2,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,2,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]");
	maps.push("[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,1,2,2,2,1,1,1,1,1],[1,1,1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1],[1,1,1,1,1,2,2,1,1,1,1,1,2,2,2,1,1,1],[1,1,1,1,1,2,1,1,1,1,1,1,1,2,2,1,1,1],[1,1,1,1,1,2,2,1,1,1,1,1,1,2,2,2,1,1],[1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,2,2,2],[1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,1,1,2,2,2,2,1,1,2,2,2,2,1,1,1],[1,1,1,2,2,2,2,1,2,2,1,1,1,1,2,2,1,1],[1,2,2,2,2,1,1,1,1,2,1,1,1,1,1,2,1,1],[2,2,2,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,2,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,2,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]");
	maps.push("[[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1]]");
	maps.push("[[1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[2,2,1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2],[2,1,1,1,1,1,2,2,2,1,2,2,2,1,2,2,2,1],[2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,2,1,1,2,2,2,1,2,2,2,2,2,2,2],[2,2,2,2,2,1,1,2,1,2,1,2,1,1,1,1,1,2],[2,1,1,1,1,1,2,2,1,2,2,2,1,2,2,2,1,2],[2,2,2,2,2,2,2,1,1,1,1,1,1,2,1,2,1,2],[1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,2,2,2],[2,2,2,2,2,2,2,1,2,1,1,1,1,1,1,1,1,1],[2,1,1,1,1,1,2,2,2,1,2,2,2,2,2,2,2,2],[2,1,2,2,2,1,1,1,1,1,2,1,1,1,1,1,1,2],[2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,1,2],[1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,2],[2,2,2,2,2,2,2,1,2,2,2,1,2,2,1,2,1,2],[2,1,1,1,1,1,2,1,2,1,2,1,1,2,1,2,1,2],[2,2,2,2,2,1,2,2,2,1,2,2,2,2,1,2,2,2],[1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1],[2,2,2,2,2,1,1,2,2,2,1,2,2,2,2,2,2,2],[2,1,1,1,1,1,1,2,1,2,1,2,1,1,1,1,1,2],[2,2,2,2,2,2,1,2,1,2,1,2,1,2,2,2,2,2],[1,1,1,1,1,2,2,2,1,2,1,2,1,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,2,1,2,2,2,2,2],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],[1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2],[1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,2,1,1,1,1,2,2,2,1,2,2,2,1],[1,1,1,1,1,2,1,2,2,2,2,1,2,1,2,1,2,1],[1,1,1,1,1,2,1,2,1,1,1,1,2,1,2,1,2,1],[1,1,1,1,1,2,1,2,2,2,2,1,2,1,2,1,2,1],[1,1,1,1,1,2,1,1,1,1,2,1,2,1,2,1,2,1],[1,1,1,1,1,2,2,2,2,2,2,1,2,2,2,1,2,1]]");
	maps.push("[[1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1],[1,1,1,2,2,2,1,2,2,2,1,1,1,2,2,1,1,1],[1,1,1,2,1,2,2,2,1,1,1,1,1,1,2,1,1,1],[1,1,2,2,1,1,2,1,1,1,1,2,2,2,2,1,1,1],[1,1,2,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1],[1,1,2,2,2,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,1,2,2,2,2,2,1,1,1,2,2,2,1,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1],[1,1,1,1,1,1,2,2,2,2,1,1,1,1,2,1,1,1],[1,1,1,1,1,2,2,2,2,2,2,1,1,2,2,1,1,1],[1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1],[1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1]]");
	maps.push("[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,2,2,2,1,1,2,2,2,1,1,1,1],[1,1,1,1,2,2,2,1,1,1,1,1,1,2,2,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,1,1,1,2,2,1,1],[1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,2,2,1],[1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2],[1,1,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,2],[1,2,2,1,1,1,1,2,2,1,1,1,2,2,1,1,1,2],[2,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2],[1,1,1,1,1,1,1,2,1,1,1,1,2,2,1,1,1,2],[1,1,1,1,1,1,1,2,1,1,2,2,2,1,1,1,1,2],[1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,2],[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,2,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]");
	maps.push("[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1],[1,1,1,1,2,2,2,2,1,2,2,1,1,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,1,2,2,1,1,1,1,1,1],[1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1],[1,1,1,1,2,1,1,1,1,1,1,2,2,1,1,1,1,1],[1,1,1,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,2,2,1,1,1,1,1,1,2,2,1,1,1,1,2,2],[2,2,2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1],[1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,2,1,1],[1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]");
	maps.push("[[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1]]");
	maps.push("[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1],[1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]");
}

function loadLevel(showIntro){

	map = $.parseJSON(maps[level-1]);
	color0="#000";
	gate1=new Object();
	gate2=new Object();
	bugs=new Array();
	cannons=new Array();
	guns=new Array();
	bullets=new Array();
	alive=true;
	deathScreenAlpha=0;
	if(showIntro)introScreenAlpha=1;
	switch(level){
		case 1:
			pathColor="#840";
			gate1.x=4;
			gate1.y=0;
			gate1.img=southgate;
			gate2.x=31;
			gate2.y=10;
			gate2.img=eastgate;
			bugArmy=10;
			bugSpeed=1.75;
			bugSize=size/1.5;
			background=grass;
			selectedGun=1;
			if(mana<150)mana=150;
			maxMana=1500;
			break;
		case 2:
			pathColor="#806";
			gate1.x=13;
			gate1.y=rows-1;
			gate1.img=northgate;
			gate2.x=14;
			gate2.y=0;
			gate2.img=northgate;
			bugArmy=20;
			bugSpeed=3;
			bugSize=size/1.1;
			background=texture1;
			selectedGun=1;
			if(mana<250)mana=250;
			maxMana=2500;
			break;
		case 3:
			pathColor="#003";
			gate1.x=19;
			gate1.y=0;
			gate1.img=southgate;
			gate2.x=8;
			gate2.y=17;
			gate2.img=southgate;
			bugArmy=40;
			bugSpeed=4.25;
			bugSize=size*1.25;
			background=circuit1;
			selectedGun=2;
			if(mana<300)mana=300;
			maxMana=3000;
			break;
		case 4:
			pathColor="#003";
			gate1.x=0;
			gate1.y=1;
			gate1.img=eastgate;
			gate2.x=31;
			gate2.y=7;
			gate2.img=eastgate;
			bugArmy=45;
			bugSpeed=6;
			bugSize=size*1.35;
			background=water;
			selectedGun=3;
			if(mana<1200)mana=1200;
			maxMana=8000;
			break;
		case 5:
			pathColor="#82f";
			gate1.x=31;
			gate1.y=16;
			gate1.img=westgate;
			gate2.x=1;
			gate2.y=17;
			gate2.img=southgate;
			bugArmy=50;
			bugSpeed=19;
			bugSize=size*1.5;
			background=carpet;
			selectedGun=3;
			if(mana<2000)mana=2000;
			maxMana=8000;
			break;
		case 6:
			pathColor="#38f";
			gate1.x=0;
			gate1.y=12;
			gate1.img=eastgate;
			gate2.x=31;
			gate2.y=9;
			gate2.img=eastgate;
			bugArmy=40;
			bugSpeed=9;
			bugSize=size*1.75;
			background=glass1;
			selectedGun=3;
			if(mana<2000)mana=2000;
			maxMana=8000;
			break;
		case 7:
			pathColor="#f00";
			gate1.x=15;
			gate1.y=0;
			gate1.img=southgate;
			gate2.x=17;
			gate2.y=10;
			gate2.img=northgate;
			bugArmy=70;
			bugSpeed=13;
			bugSize=size*2;
			background=lava1;
			selectedGun=3;
			if(mana<3000)mana=3000;
			maxMana=12000;
			break;
		case 8:
			pathColor="#0f8";
			gate1.x=14;
			gate1.y=0;
			gate1.img=southgate;
			gate2.x=13;
			gate2.y=rows-1;
			gate2.img=southgate;
			bugArmy=100;
			bugSpeed=14;
			bugSize=size*2.25;
			background=glass2;
			selectedGun=4;
			if(mana<4000)mana=4000;
			maxMana=16000;
			break;
		case 9:
			pathColor="#f80";
			gate1.x=0;
			gate1.y=9;
			gate1.img=eastgate;
			gate2.x=31;
			gate2.y=9;
			gate2.img=eastgate;
			bugArmy=120;
			bugSpeed=15;
			bugSize=size*2.5;
			background=sticks;
			selectedGun=4;
			if(mana<8000)mana=8000;
			maxMana=16000;
			break;
		case 10:
			pathColor="#000";
			gate1.x=14;
			gate1.y=0;
			gate1.img=southgate;
			gate2.x=14;
			gate2.y=17;
			gate2.img=southgate;
			bugArmy=150;
			bugSpeed=16;
			bugSize=size*4;
			background=lava2;
			selectedGun=4;
			if(mana<16000)mana=16000;
			maxMana=32000;
			break;
	}
	bugSpawnInterval=100/(.01+bugSpeed);
}

function initVars(){
	
	pi=Math.PI;
	canvas=$("#canvas")[0];
	ctx=canvas.getContext("2d");
	frames=0;
	canvas.width=1360;
	canvas.height=768;
	cx=canvas.width/2;
	cy=canvas.height/2;
	northgate=new Image();
	northgate.src="northgate.png";
	southgate=new Image();
	southgate.src="southgate.png";
	eastgate=new Image();
	eastgate.src="eastgate.png";
	westgate=new Image();
	westgate.src="westgate.png";
	castleScreen=new Image();
	castleScreen.src="castle.jpg";
	deathScreen=new Image();
	deathScreen.src="deathScreen.png";
	victoryScreen=new Image();
	victoryScreen.src="victoryScreen.jpg";
	victoryScreenAlpha=0;
	cannonPics=new Array();
	cannon1=new Image();
	cannon1.src="cannon1.png";
	cannonPics.push(cannon1);
	cannon2=new Image();
	cannon2.src="cannon2.png";
	cannonPics.push(cannon2);
	cannon3=new Image();
	cannon3.src="cannon3.png";
	cannonPics.push(cannon3);
	cannon4=new Image();
	cannon4.src="cannon4.png";
	cannonPics.push(cannon4);
	cannon1Button=new Image();
	cannon1Button.src="cannon1Button.png";
	cannon2Button=new Image();
	cannon2Button.src="cannon2Button.png";
	cannon3Button=new Image();
	cannon3Button.src="cannon3Button.png";
	cannon4Button=new Image();
	cannon4Button.src="cannon4Button.png";
	cannon1ButtonDisabled=new Image();
	cannon1ButtonDisabled.src="cannon1ButtonDisabled.png";
	cannon2ButtonDisabled=new Image();
	cannon2ButtonDisabled.src="cannon2ButtonDisabled.png";
	cannon3ButtonDisabled=new Image();
	cannon3ButtonDisabled.src="cannon3ButtonDisabled.png";
	cannon4ButtonDisabled=new Image();
	cannon4ButtonDisabled.src="cannon4ButtonDisabled.png";
	button1=new Object();button1.x=cx*2-415;button1.y=65;button1.width=200,button1.height=50;
	button2=new Object();button2.x=cx*2-210;button2.y=65;button2.width=200,button2.height=50;
	button3=new Object();button3.x=cx*2-415;button3.y=115;button3.width=200,button3.height=50;
	button4=new Object();button4.x=cx*2-210;button4.y=115;button4.width=200,button4.height=50;
	bugPics=new Array();
	bug1=new Image();
	bug1.src="bug1.png";
	bugPics.push(bug1);
	bug2=new Image();
	bug2.src="bug2.png";
	bugPics.push(bug2);
	grass=new Image();
	grass.src="grass.jpg";
	texture1=new Image();
	texture1.src="texture1.jpg";
	circuit1=new Image();
	circuit1.src="circuit1.jpg";
	circuit2=new Image();
	circuit2.src="circuit2.jpg";
	water=new Image();
	water.src="water.jpg";
	carpet=new Image();
	carpet.src="carpet.jpg";
	lava1=new Image();
	lava1.src="lava1.jpg";
	lava2=new Image();
	lava2.src="lava2.jpg";
	sticks=new Image();
	sticks.src="sticks.jpg";
	glass1=new Image();
	glass1.src="glass1.jpg";
	glass2=new Image();
	glass2.src="glass2.jpg";
	chuckNorris=new Image();
	chuckNorris.src="chuckNorris.png";
	bang=new Audio("bang.ogg");
	pew=new Audio("pew.ogg");
	bugDeath=new Audio("bugDeath.ogg");
	squeak=new Audio("squeak.ogg");
	soundtrack=new Audio();
	soundtrack.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	leftkey=rightkey=upkey=downkey=spacekey=enterkey=0;
	mx=my=leftButton=rightButton=0;
	level=1;
	mana=0;
	bugTimer=0;
	map = $.parseJSON(maps[level-1]);
	rows=map[0].length;
	cols=map.length;
	size=cx*2/cols;
	tile=new Object();
	tile.x=cols/2,tile.y=rows/2;
	canvas.addEventListener("mousemove", mouse, true);
	canvas.onmousedown=function(event){event.preventDefault();}
	canvas.addEventListener("mousedown", function(event) {
		switch (event.which) {
			case 1: leftButton=true; break;
			case 3: rightButton=true; break;
		}
	});
	canvas.addEventListener("mouseup", function(event) {
		switch (event.which) {
			case 1: leftButton=false; break;
			case 3: rightButton=false; break;
		}
	});
}

function mouse(e) {

    var rect = canvas.getBoundingClientRect();
	mx = Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas.width);
	my = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
}

window.addEventListener("keydown", function(e){
	chr=e.keyCode || e.charCode;
	switch(chr){
		case 37:leftkey=1;break;
		case 38:upkey=1;break;
		case 39:rightkey=1;break;
		case 40:downkey=1;break;
		case 32:spacekey=1;break;
		case 13:enterkey=1;break;
	}
});

window.addEventListener("keyup", function(e){
	chr=e.keyCode || e.charCode;
	switch(chr){
		case 37:leftkey=0;break;
		case 38:upkey=0;break;
		case 39:rightkey=0;break;
		case 40:downkey=0;break;
		case 32:spacekey=0;break;
		case 13:enterkey=0;break;
	}
});

function spawnBug(bugSize){

	bug=new Object();
	bug.x=gate1.x*size+size/2;
	bug.y=gate1.y*size+size/2;
	bug.bx=gate1.x;
	bug.by=gate1.y;
	bug.obx=-1;
	bug.oby=-1;
	bug.tx=0;
	bug.ty=0;
	bug.vx=0;
	bug.vy=0;
	bug.size=bugSize;
	bug.originalSize=bugSize;
	switch(gate1.img){
		case southgate:bug.theta=pi;break;	
		case northgate:bug.theta=0;break;	
		case westgate:bug.theta=pi*1.5;break;	
		case eastgate:bug.theta=pi/2;break;	
	}
	bug.img=bugPics[parseInt(Math.random()*bugPics.length)];
	bugs.push(bug);
}

function emptyGrid(){
	
	grid=new Array(cols);
	for(k=0;k<cols;++k){
		grid[k]=new Array(rows);
		for(k2=0;k2<rows;++k2) grid[k][k2]=0;
	}
	return grid;
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function getPath(x,y){

	if(x<0||x>cols-1||y<0||y>rows-1||map[gate1.x][gate1.y]!=2||map[gate2.x][gate2.y]!=2)return;
	t=1;
	point=new Object();
	point.x=x;
	point.y=y;
	memo[point.x][point.y]=t;
	queue=new Array();
	queue.push(point);
	pathFound=false;
	do{
		for(k=0;k<queue.length;++k){
			t++;
			if(queue[k].x==gate2.x&&queue[k].y==gate2.y){
				pathFound=true;
				memo[gate2.x][gate2.y]=t;
				break;
			}
			if(queue[k].x+1<cols && !memo[queue[k].x+1][queue[k].y] && map[queue[k].x+1][queue[k].y]==2){
				point=new Object();
				point.x=queue[k].x+1;
				point.y=queue[k].y;
				queue.push(point);
				memo[point.x][point.y]=t;
			}
			if(queue[k].y+1<rows && !memo[queue[k].x][queue[k].y+1] && map[queue[k].x][queue[k].y+1]==2){
				point=new Object();
				point.x=queue[k].x;
				point.y=queue[k].y+1;
				queue.push(point);
				memo[point.x][point.y]=t;
			}
			if(queue[k].x-1>=0 && !memo[queue[k].x-1][queue[k].y] && map[queue[k].x-1][queue[k].y]==2){
				point=new Object();
				point.x=queue[k].x-1;
				point.y=queue[k].y;
				queue.push(point);
				memo[point.x][point.y]=t;
			}
			if(queue[k].y-1>=0 && !memo[queue[k].x][queue[k].y-1] && map[queue[k].x][queue[k].y-1]==2){
				point=new Object();
				point.x=queue[k].x;
				point.y=queue[k].y-1;
				queue.push(point);
				memo[point.x][point.y]=t;
			}
			queue.splice(k,1);
		}
	}while(!pathFound && queue.length);
	path=new Array();
	point=new Object();
	point.x=gate2.x;
	point.y=gate2.y;
	path.push(point);
	point=new Object();
	point.x=gate2.x;
	point.y=gate2.y;
	
	do{
		if(point.x+1<cols && memo[point.x+1][point.y] && memo[point.x+1][point.y]<memo[point.x][point.y]){
			point.x++;
			path.push(point);
			point=new Object();
			point.x=path[path.length-1].x;
			point.y=path[path.length-1].y;
		}
		if(point.x-1>=0 && memo[point.x-1][point.y] && memo[point.x-1][point.y]<memo[point.x][point.y]){
			point.x--;
			path.push(point);
			point=new Object();
			point.x=path[path.length-1].x;
			point.y=path[path.length-1].y;
		}
		if(point.y+1<rows && memo[point.x][point.y+1] && memo[point.x][point.y+1]<memo[point.x][point.y]){
			point.y++;
			path.push(point);
			point=new Object();
			point.x=path[path.length-1].x;
			point.y=path[path.length-1].y;
		}
		if(point.y-1>=0 && memo[point.x][point.y-1] && memo[point.x][point.y-1]<memo[point.x][point.y]){
			point.y--;
			path.push(point);
			point=new Object();
			point.x=path[path.length-1].x;
			point.y=path[path.length-1].y;
		}
	}while(!(point.x==x&point.y==y));
}

function rgb(col){
	
	var r = parseInt((.5+Math.sin(col)*.5)*16);
	var g = parseInt((.5+Math.cos(col)*.5)*16);
	var b = parseInt((.5-Math.sin(col)*.5)*16);
	return "#"+r.toString(16)+g.toString(16)+b.toString(16);
}

function doLogic(){

	if(!bugs.length&&bugArmy==0&&mana){
		victoryScreenAlpha=.05;
		victoryUp=true;
	}else{
		if(bugTimer<frames && bugArmy>0){
			bugTimer=frames+bugSpawnInterval;
			spawnBug(bugSize);
			bugArmy--;
		}
		for(i=0;i<bugs.length;++i){
			if(bugs[i].obx!=bugs[i].bx || bugs[i].oby!=bugs[i].by){
				bugs[i].obx=bugs[i].bx;
				bugs[i].oby=bugs[i].by;
				memo=emptyGrid();
				getPath(bugs[i].bx,bugs[i].by);
				if(path.length>1){
					bugs[i].tx=path[path.length-2].x*size+size/2;
					bugs[i].ty=path[path.length-2].y*size+size/2;
				}
			}
			p=Math.atan2(bugs[i].tx-bugs[i].x,-(bugs[i].ty-bugs[i].y));
			if(Math.abs(p-bugs[i].theta)>pi){
				if(p>bugs[i].theta){
					p-=pi*2;
				}else{
					p+=pi*2;
				}
			}
			bugs[i].theta+=(p-bugs[i].theta)/25*bugSpeed;
			bugs[i].theta+=.1-Math.random()/5;
			bugs[i].vx=Math.sin(bugs[i].theta)*bugSpeed;
			bugs[i].vy=-Math.cos(bugs[i].theta)*bugSpeed;
			bugs[i].x+=bugs[i].vx;
			bugs[i].y+=bugs[i].vy;
			bugs[i].bx=Math.floor(bugs[i].x/size);
			bugs[i].by=Math.floor(bugs[i].y/size);
			if(bugs[i].bx==gate2.x && bugs[i].by==gate2.y){
				if(mana-bugs[i].size*3>0){
					mana-=bugs[i].size*3;
					mana=Math.round(mana);
					spawnBug(bugs[i].size);
					bugs.splice(i,1);
				}else{
					mana=0;
					alive=false;
					break;
				}
			}
		}
		if(mana<0)mana=0;
		if(mx>cx*2-420 && my<170){
			$('body').css('cursor', 'default');
			tile.mode=-1;
		}else{
			$('body').css('cursor', 'none');
			tile.x=Math.floor(mx/size);
			tile.y=Math.floor(my/size);
			tile.mode=map[tile.x][tile.y];
		}
		if(leftButton){
			if(mx>button1.x && mx<button1.x+button1.width &&
			   my>button1.y && my<button1.y+button1.height && mana>=100) selectedGun=1;
			if(mx>button2.x && mx<button2.x+button2.width &&
			   my>button2.y && my<button2.y+button2.height && mana>=300) selectedGun=2;
			if(mx>button3.x && mx<button3.x+button3.width &&
			   my>button3.y && my<button3.y+button3.height && mana>=1000) selectedGun=3;
			if(mx>button4.x && mx<button4.x+button4.width &&
			   my>button4.y && my<button4.y+button4.height && mana>=4000) selectedGun=4;
			if(tile.mode==1 && selectedGun){
				gun=new Object();
				gun.x=tile.x*size+size/2;
				gun.y=tile.y*size+size/2;
				gun.img=cannonPics[selectedGun-1];
				gun.type=selectedGun;
				gun.size=size*2;
				gun.theta=0;
				gun.timer=0;
				switch(selectedGun){
					case 1: 
						mana-=100;
						gun.radius=150;
						if(mana<100)selectedGun=0;
						break;
					case 2:
						mana-=300;
						gun.radius=200;
						if(mana<300)selectedGun=1;
						break;
					case 3:
						mana-=1000;
						gun.radius=400;
						if(mana<1000)selectedGun=2;
						break;
					case 4:
						mana-=4000;
						gun.radius=800;
						if(mana<4000)selectedGun=3;
						break;
				}
				guns.push(gun);
				map[tile.x][tile.y]=0;
				leftButton=0;
			}
		}

		for(i=0;i<guns.length;++i){
			mind=10000;
			t=-1;
			for(j=0;j<bugs.length;++j){
				d=Math.sqrt((bugs[j].x-guns[i].x)*(bugs[j].x-guns[i].x)+(bugs[j].y-guns[i].y)*(bugs[j].y-guns[i].y));
				if(d<mind && d<=guns[i].radius){
					mind=d;
					t=j;
				}
			}
			if(t!=-1){
				guns[i].theta=Math.atan2(bugs[t].x-guns[i].x,guns[i].y-bugs[t].y);
				if(guns[i].timer<frames){
					bullet=new Object();
					bullet.x1=guns[i].x;
					bullet.y1=guns[i].y;
					bullet.x2=bugs[t].x;
					bullet.y2=bugs[t].y;
					bullet.alpha=1;
					bullet.type=guns[i].type;
					bullets.push(bullet);
					switch(guns[i].type){
						case 1: 
							guns[i].timer=frames+40; bugs[t].size/=1.3; mana+=5;
							bang=new Audio("bang.ogg");
							bang.onended=function(){delete bang};
							bang.volume=.15;
							bang.play();
							break;
						case 2:
							guns[i].timer=frames+20; bugs[t].size/=1.4; mana+=10;
							bang=new Audio("pew.ogg");
							bang.onended=function(){delete bang};
							bang.volume=.15;
							bang.play();
							break;
						case 3:
							guns[i].timer=frames+10; bugs[t].size/=1.5; mana+=15;
							bang=new Audio("pew.ogg");
							bang.onended=function(){delete bang};
							bang.volume=.15;
							bang.play();
							break;
						case 4:
							guns[i].timer=frames+4; bugs[t].size/=1.6; mana+=25;
							bang=new Audio("pew.ogg");
							bang.onended=function(){delete bang};
							bang.volume=.15;
							bang.play();
							break;
					}
					if(bugs[t].size<15){
						mana+=bugs[t].originalSize/6;
						bugs.splice(t,1);
						bugDeath=new Audio("bugDeath.ogg");
						bugDeath.onended=function(){delete bang};
						bugDeath.volume=.35;
						bugDeath.play();
					}else{
						squeak=new Audio("squeak.ogg");
						squeak.onended=function(){delete squeak};
						squeak.volume=.15;
						squeak.play();
					}
					mana=Math.round(mana);
					if(!selectedGun && mana>=100) selectedGun=1;
					if(selectedGun==1 && mana>=300) selectedGun=2;
					if(selectedGun==2 && mana>=1000) selectedGun=3;
					if(selectedGun==3 && mana>=4000) selectedGun=4;
				}
			}
		}
		mana=Math.round(mana);
		if(mana>maxMana)mana=maxMana;
		/*
		ctx.globalAlpha=.5;
		for(i=0;i<path.length;++i){
			ctx.fillStyle="#fff";
			ctx.fillRect(path[i].x*size,path[i].y*size,size,size);
		}
		
		for(i=0;i<cols;++i){
			for(j=0;j<rows;++j){
				if(memo[i][j]){
					ctx.fillStyle=rgb(1+memo[i][j]/20);
					ctx.fillRect(i*size,j*size,size,size);
				}
			}
		}
		*/
	}
}

function drawRotatedImage(image, x, y, width, height, angle) { 

	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.drawImage(image, -width/2, -height/2, width, height);
	ctx.restore();
}

function addCommas(intNum) {

  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function draw(){
	
	ctx.clearRect(0,0,cx*2,cy*2);
	ctx.globalAlpha=1;
	ctx.drawImage(background,0,0,cx*2,cy*2);
	
	ctx.globalAlpha=.7;
	ctx.fillStyle=pathColor;
	for(i=0;i<cols;++i){
		for(j=0;j<rows;++j){
			if(map[i][j]==2){
				x=(i*size);
				y=(j*size);
				ctx.fillRect(x,y,size+1,size+1);
			}
		}
	}
	
	ctx.globalAlpha=1;
	if(tile.mode!=-1){
		ctx.fillStyle=tile.mode==1&&selectedGun?"#0f8":"#f00";
		ctx.fillRect(tile.x*size,tile.y*size,size,size);
	}

	for(i=0;i<bugs.length;++i){
		drawRotatedImage(bugs[i].img,bugs[i].x,bugs[i].y,bugs[i].size,bugs[i].size,bugs[i].theta);
	}
	
	for(i=0;i<bullets.length;++i){
		if(bullets[i].alpha>0){
			ctx.globalAlpha=bullets[i].alpha;
			ctx.lineWidth=Math.pow(2,bullets[i].type);
			switch(bullets[i].type){
				case 1: ctx.strokeStyle="#ff0"; break;
				case 2: ctx.strokeStyle="#0f4"; break;
				case 3: ctx.strokeStyle="#00f"; break;
				case 4: ctx.strokeStyle="#f08"; break;
			}
			ctx.beginPath();
			ctx.moveTo(bullets[i].x1,bullets[i].y1);
			ctx.lineTo(bullets[i].x2,bullets[i].y2);
			ctx.stroke();
			bullets[i].alpha-=.25;
		}else{
			bullets.splice(i,1);
		}
	}

	for(i=0;i<guns.length;++i){
		ctx.globalAlpha=1;
		drawRotatedImage(guns[i].img,guns[i].x,guns[i].y,guns[i].size,guns[i].size,guns[i].theta);
		switch(guns[i].type){
			case 1: ctx.strokeStyle="#ff0"; break;
			case 2: ctx.strokeStyle="#0f4"; break;
			case 3: ctx.strokeStyle="#00f"; break;
			case 4: ctx.strokeStyle="#f08"; break;
		}
		ctx.beginPath();
		ctx.lineWidth=25;
		ctx.globalAlpha=.25;
		ctx.arc(guns[i].x,guns[i].y,guns[i].radius,0,pi*2);
		ctx.stroke();
	}
	
	ctx.globalAlpha=1;
	ctx.drawImage(gate1.img,gate1.x*size-size*2+size/2,gate1.y*size-size*2+size/2,size*4,size*4);
	ctx.drawImage(gate2.img,gate2.x*size-size*2+size/2,gate2.y*size-size*2+size/2,size*4,size*4);
	
	ctx.globalAlpha=.5;
	if(selectedGun){
		ctx.drawImage(cannonPics[selectedGun-1],mx-size,my-size,size*2,size*2);
	}
	ctx.globalAlpha=.5;
	ctx.lineWidth=5;
	ctx.fillStyle="#66a";
	ctx.strokeStyle="#aa6";
	ctx.fillRect(cx*2-420,10,415,160);
	ctx.strokeRect(cx*2-420,10,415,160);
	//ctx.textAlign="end";
	ctx.globalAlpha=1;
	ctx.lineWidth=1;
	ctx.strokeStyle="#ff0";
	ctx.fillStyle="#00f"
	ctx.font="48px arial";
	ctx.fillText("MANA = "+addCommas(mana),cx*2-390,55);
	ctx.strokeText("MANA = "+addCommas(mana),cx*2-390,55);
	b=mana>=100?cannon1Button:cannon1ButtonDisabled;
	ctx.drawImage(b,button1.x,button1.y,button1.width,button1.height);
	b=mana>=300?cannon2Button:cannon2ButtonDisabled;
	ctx.drawImage(b,button2.x,button2.y,button2.width,button2.height);
	b=mana>=1000?cannon3Button:cannon3ButtonDisabled;
	ctx.drawImage(b,button3.x,button3.y,button3.width,button3.height);
	b=mana>=4000?cannon4Button:cannon4ButtonDisabled;
	ctx.drawImage(b,button4.x,button4.y,button4.width,button4.height);
	
	ctx.strokeStyle="#f4";
	ctx.lineWidth=10;
	ctx.globalAlpha=.7;
	switch(selectedGun){
		case 0: break;
		case 1:
			ctx.strokeRect(button1.x,button1.y,button1.width,button1.height);
			break;
		case 2:
			ctx.strokeRect(button2.x,button2.y,button2.width,button2.height);
			break;
		case 3:
			ctx.strokeRect(button3.x,button3.y,button3.width,button3.height);
			break;
		case 4:
			ctx.strokeRect(button4.x,button4.y,button4.width,button4.height);
			break;
	}

	if(introScreenAlpha){
		ctx.globalAlpha=introScreenAlpha;
		ctx.drawImage(castleScreen,0,0);
		ctx.fillStyle="#0a8";
		ctx.strokeStyle="#fff";
		ctx.lineWidth=2;
		ctx.font="120px arial";
		ctx.fillText("Tower",10,100);
		ctx.strokeText("Tower",10,100);		
		ctx.font="100px arial";
		ctx.fillText("Defense",10,180);
		ctx.strokeText("Defense",10,180);		
		ctx.fillStyle="#ff0";
		ctx.strokeStyle="#000";
		ctx.font="72px arial";
		ctx.fillText("Keep the bugs from reaching",cx-350,cy+100);
		ctx.strokeText("Keep the bugs from reaching",cx-350,cy+100);
		ctx.fillText("the end of the path.",cx-50,cy+180);
		ctx.strokeText("the end of the path.",cx-50,cy+180);
		ctx.font="80px arial";
		ctx.fillText("HIT ENTER",cx+80,cy+350);
		ctx.strokeText("HIT ENTER",cx+80,cy+350);
	}
	if(deathScreenAlpha){
		ctx.globalAlpha=deathScreenAlpha;
		ctx.drawImage(deathScreen,0,0,cx*2,cy*2);
		ctx.fillStyle="#410";
		ctx.strokeStyle="#f00";
		ctx.lineWidth=2;
		ctx.font="120px Comic Sans MS";
		ctx.fillText("DEFEAT!",cx-250,cy+50);
		ctx.strokeText("DEFEAT!",cx-250,cy+50);		
		ctx.font="46px arial";
		ctx.lineWidth=1;
		ctx.fillText("HIT THE SPACEBAR",cx-210,cy+300);
		ctx.strokeText("HIT THE SPACEBAR",cx-210,cy+300);
		if(spacekey){
			loadLevel(false);
		}
	}
	if(victoryScreenAlpha){
		ctx.globalAlpha=victoryScreenAlpha;
		ctx.drawImage(victoryScreen,0,0,cx*2,cy*2);
		ctx.fillStyle="#041";
		ctx.strokeStyle="#0f4";
		ctx.lineWidth=2;
		ctx.font="120px Comic Sans MS";
		ctx.fillText("VICTORY!",cx-260,cy-150);
		ctx.strokeText("VICTORY!",cx-260,cy-150);		
		ctx.font="46px arial";
		ctx.lineWidth=1;
		if(level<11){
			ctx.fillText("HIT THE SPACEBAR",cx-210,cy-50);
			ctx.strokeText("HIT THE SPACEBAR",cx-210,cy-50);
		}else{
			ctx.drawImage(chuckNorris,cx+200,200);
			ctx.fillText("*** GAME OVER ***",cx-210,cy-50);
			ctx.strokeText("*** GAME OVER ***",cx-210,cy-50);			
		}
	}
}

function frame(){

	frames++;
	draw();
	if(introScreenAlpha){
		if(introScreenAlpha==1&&enterkey)introScreenAlpha-=.05;
		if(introScreenAlpha<1) introScreenAlpha-=.05;
		if(introScreenAlpha<=0)introScreenAlpha=0;
	}else{
		if(victoryScreenAlpha){
			if(victoryScreenAlpha<1){
				victoryScreenAlpha+=.05*(victoryUp?1:-1);
				if(victoryScreenAlpha>1)victoryScreenAlpha=1;
				if(victoryScreenAlpha<0)victoryScreenAlpha=0;
			}else{
				if(spacekey){
					level++;
					if(level<11){
						loadLevel(false);
						victoryScreenAlpha=.95;
						victoryUp=false;
					}
				}
			}
		}else{
			if(alive){
				doLogic();
			}else{
				if(deathScreenAlpha<1){
					deathScreenAlpha+=.05;
				}else{
					deathScreenAlpha=1;
				}
			}			
		}
	}
}

function kickoff(){
	
	loadLevel(true);
	//$('body').css('cursor', 'none');	
	clearInterval(loadTimer);
	$("body").css("background:#000");
	$("#canvas").show();
	introScreenAlpha=1;
	draw();
	$("#loadingOuter").hide();
	soundtrack.src="elves.mp3";
	soundtrack.volume=.2;
	soundtrack.play();
	setInterval(frame,30);
}

function load(){

	$("#loading").html("LOADING");
	for(i=0;i<frames%4;++i) $("#loading").html($("#loading").html()+".");
	frames++;
}

loadMaps();
initVars();
loadTimer=setInterval(load,100);