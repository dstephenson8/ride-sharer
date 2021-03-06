function calendar(curr_month, curr_year, day_num, month_num, year_num, depart_city, depart_time, arrive_city)
{
	
	//holds the current month and year which will be used to go to the previous or next month
	document.curr_month = curr_month;
	document.curr_year = curr_year;

	//create date object
	var date = new Date();

	//set the month and year from the input parameters
	date.setMonth(curr_month);
	date.setYear(curr_year);
	//get important attributes from object
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	
	//create months array and days in months
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	days_in_month = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	
	//leap year?
	if(year%4 == 0 && year!=1900)
	{
			days_in_month[1]=29;
	}
	
	//total days in present month
	total = days_in_month[curr_month];
	
	//variable for the title of the calendar
	var date_today = months[month]+' '+year;
	
	//create table and first row
	var text = '';

	text += ('<table class="cal_calendar"><tbody id="cal_body"><tr>');
	//create previous month button
	text += ('<td class="button_td" id="prev_month"><button type="submit" class="button" onmouseover="highlight(this);" id="'+month+'">Previous Month</button></td>');
	//create title for calendar
	text += ('<th colspan="5" id="date">'+date_today+'</th>');
	//create next month button
	text += ('<td class="button_td" id="next_month"><button type="submit" class="button" onmouseover="highlight(this);" id="'+month+'">Next Month</button></td></tr>');
	//create week label headers
	text += ('<tr class="cal_weeks"><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr><tr>');
	
	//will help determine what day (mon, tues...) the 1st of this month will fall on
	var beginning = date;
	
	//sets the day to be the first of the current month
	beginning.setDate(1);
	
	//gets the day of the week the first falls on, 0-sunday, 1-monday....
	the_first = beginning.getDay();
	the_first_copy = the_first; //used for subtraction when we are filling in this months days, the_first gets decremented to 0 and becomes useless after the first week

	//num is the number of times we added a date from the previous month
	num = 0; 
	
	//set today's day
	var d_copy = new Date();
	today = d_copy.getDate();
	today_month = d_copy.getMonth();
	next_weeks = 0;

	for(weeks = 0; weeks < 6; weeks++){  //rows for the calendar, set to be 5 unless the last week has only the next months days
	
		text += ('<tr>');

		for(days = 1, numdays = 0; days < 8; days++) //cols for calendar
		{	
			day_info = ""; //will be used to hold the value for the td tag
			
			//these are used to determine if there are posts for this td tag
			curr_day = 0;
			curr_month = 0;
			curr_year = 0;

			if(the_first > 0)  //fills in the previous months days
			{
				if(month == 0){
					curr_day = 31-(the_first-1);
					curr_month = 11;
					curr_year = year;
					day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

					text += ('<td class="cal_prev_month_days" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+(31-(the_first-1))+','+(11)+'">'+(31-(the_first-1))+'<div class="date_info">'+day_info+'</div></td>');
				}
				else{
					curr_day = (days_in_month[month-1]-(the_first-1));
					curr_month = month-1;
					curr_year = year;
					day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

					text += ('<td class="cal_prev_month_days" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+(days_in_month[month-1]-(the_first-1))+','+(month-1)+'">'+(days_in_month[month-1]-(the_first-1))+'<div class="date_info">'+day_info+'</div></td>');
				}
				the_first--;
				num++;
			}
			else if( (7*weeks)+days-(the_first_copy) <= total) //fill in days for this month
			{	
				numdays++;

			thisDay = (7*weeks)+days-(the_first_copy);

				if( thisDay == today && today_month == month && year == d_copy.getFullYear()) //is this day today?
				{

					if(weeks == 0){ //if it is still the first week, don't subtract when the day the 1st started
						
						curr_day = (7*weeks)+days-num;
						curr_month = month;
						curr_year = year;
						day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

						text += ('<td class="today" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+((7*weeks)+days-num)+','+(month)+'">'+((7*weeks)+days-num)+'<div class="date_info">'+day_info+'</div></td>');
					}

					else{ //it is not still the first week

						curr_day = (7*weeks)+days-num-the_first;
						curr_month = month;
						curr_year = year;
						day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

						text += ('<td class="today" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+((7*weeks)+days-num-the_first)+','+(month)+'">'+((7*weeks)+days-num-the_first)+'<div class="date_info">'+day_info+'</div></td>');
					}
				}
				
				else //this day is not today, normal CSS name
				{  
				
					if(weeks == 0){ //if it is still the first week, don't subtract when the day the 1st started

						curr_day = (7*weeks)+days-num;
						curr_month = month;
						curr_year = year;
						day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

						text += ('<td class="cal_days" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+((7*weeks)+days-num)+','+(month)+'">'+((7*weeks)+days-num)+'<div class="date_info">'+day_info+'</div></td>');
					}

					else{ //not the first week

						curr_day = (7*weeks)+days-num-the_first;
						curr_month = month;
						curr_year = year;
						day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

						text += ('<td class="cal_days" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+((7*weeks)+days-num-the_first)+','+(month)+'">'+((7*weeks)+days-num-the_first)+'<div class="date_info">'+day_info+'</div></td>');
					}
				}
				if((7*weeks)+days-(the_first_copy) == total){
					weeks = 6;
				}
			}
			
			else{ //no more days in this month, start writing for the next month, don't need to worry about num since that only effects the first week
				if(month == 11){
					curr_day = (7*next_weeks)+days-numdays;
					curr_month = 0;
					curr_year = year;
					day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

					text += ('<td class="cal_next_month_days" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+((7*next_weeks)+days-numdays)+','+(0)+'" >'+((7*next_weeks)+days-numdays)+'<div class="date_info">'+day_info+'</div></td>');
				}
				else{
					curr_day = (7*next_weeks)+days-numdays;
					curr_month = month+1;
					curr_year = year;
					day_info = get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num);

					text += ('<td class="cal_next_month_days" onmouseover="highlight(this);" onmouseout="unhighlight(this);" onclick="handleClick(this,'+year+');" id="'+((7*next_weeks)+days-numdays)+','+(month+1)+'" >'+((7*next_weeks)+days-numdays)+'<div class="date_info">'+day_info+'</div></td>');
				}
				
				if(days == 7){
					weeks = 6;
				}
			}
		}
		
		text += ('</tr>');
	
	}
	text += ('</tbody></table>');
	
	document.getElementById('my-calendar').innerHTML = text;
	document.getElementById('next_month').onclick=function(){nextMonth(day_num,month_num,year_num,depart_city,depart_time,arrive_city);};
	document.getElementById('prev_month').onclick=function(){prevMonth(day_num,month_num,year_num,depart_city,depart_time,arrive_city);};
	return true;
}

//controls what happens when the user click on a date (td tag)
function handleClick(elem, year){

	var monthAndDay = elem.id.split(",");
	var day = monthAndDay[0];
	var month = monthAndDay[1];
	months_2 = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	
	//window.open("http://localhost:9080/list_rides?day="+day+"&month="+months_2[month]+"&year="+year+"", "_blank", "width=400, height=400, scrollbars = no");

	location.replace("list_rides?day="+day+"&month="+months_2[month]+"&year="+year+"");
	
}

//controls what happens when the user hovers over a td tag
function highlight(tag) 
{
	tag.style.cursor = "pointer";
}

//controls what happens when the user unhovers over a td tag
function unhighlight(tag)
{
	//nothing here for now
}

//controls when the user hits the previous month button
function prevMonth(day_num, month_num, year_num, depart_city, depart_time, arrive_city)
{
	document.curr_month--;
	if(document.curr_month < 0){
		document.curr_month = 11;
		document.curr_year -= 1;
	}
	calendar(document.curr_month, document.curr_year, day_num, month_num, year_num, depart_city, depart_time, arrive_city);
}

//controls when the user hits the next month button
function nextMonth(day_num, month_num, year_num, depart_city, depart_time, arrive_city)
{
	document.curr_month++;
	if(document.curr_month == 12){
		document.curr_month = 0;
		document.curr_year += 1;
	}
	calendar(document.curr_month, document.curr_year, day_num, month_num, year_num, depart_city, depart_time, arrive_city); 	
}

//returns the number of rides for a certain day
function get_day_info(curr_day, curr_month, curr_year, day_num, month_num, year_num){

	num_posts_this_day = 0;

	if(typeof day_num !== 'undefined' && day_num.length > 0){
		//get number of posts for this day
		for(i = 0; i < day_num.length; i++){

			if(curr_day == day_num[i] && curr_month == month_num[i] && curr_year == year_num[i]){
				num_posts_this_day += 1;
			}
		}

		if(num_posts_this_day > 0){
			if(num_posts_this_day == 1){
				return num_posts_this_day+" Ride Available";
			}
			else{
				return num_posts_this_day+" Rides Available";
			}
		}
		else{
			return "";
		}
	}
	else{
		return "";
	}

}

