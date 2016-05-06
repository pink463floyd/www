from bs4 import BeautifulSoup
import requests
import re
import datetime

#first day of 2014 season
#http://www.baseball-reference.com/games/standings.cgi?year=2014&month=03&day=22&submit=Submit+Date

#input:
#<tr class="">
#   <td align="left"><a href="/teams/COL/2014.shtml">COL</a></td>
#   <td align="right">55</td>
#   <td align="right">83</td>
#   <td align="right">.399</td>
#   <td align="right">22.0</td>
#   <td align="right">631</td>
#   <td align="right">717</td>
#   <td align="right">.442</td>
#</tr>
#
#output: COL 55 83 .399 22.0 651 717 .442
#        TM  W  L  %    GB   RS  RA   pythW-Lr%
field = ['team:', 'wins:', 'losses:', 'pct:', 'GB:', 'RS:', 'RA', 'pyth']
mydata = [];
def emit_standings(year, month, day, division, record) :
   mydata=[]     
   for td in record.find_all("td") :
     if  td.string:
        mydata.append(td.string.encode('ascii', 'ignore'))
     else:
        mydata.append('')
   print("{%s '%s-%s-%s', %s '%s', %s '%s', %s '%s', %s '%s', %s '%s', %s '%s', %s '%s'}," % ("date:", year, month, day, "league:", division[0], "division:", division[1], field[0], mydata[0], field[1], mydata[1], field[2], mydata[2], field[3], mydata[3], field[4], mydata[4]))


def get_results(year, month, day) :
   url  = ("http://www.baseball-reference.com/games/standings.cgi?year=%s&month=%s&day=%s&submit=Submit+Date" % (year, month, day))
   r  = requests.get(url);
   data = r.text
   soup = BeautifulSoup(data, "html5lib")
   top = soup.find("td", "padding_right") 
   current = top.contents[0]
   i=1
   for sibling in current.next_siblings:
      if (((i-1) % 5) == 0) : # 1,6,11,16.....
         division = sibling.h3.string.split(' ')
      if (((i-3) % 5) == 0) : 
        standings=sibling
        tbody = standings.tbody
        tr = tbody.contents[0]
        j=1
        for td in tr.next_siblings:
          if (j % 2) : 
             emit_standings(year, month, day, division, td)
             td.find("td")
          j = j+1
      i=i+1


delta = datetime.timedelta(days=1)
d = datetime.datetime(2014,3,21)
end_date = datetime.datetime(2014,9,8)
end_date = datetime.datetime.today()
end_date -= delta #set to yesterday's date
while d <= end_date: 
    tmpYear = d.year;
    tmpMonth = d.month;
    tmpDay = d.day;

    if tmpMonth <= 9:
       tmpMonth = "0%d" % (tmpMonth)

    if tmpDay <= 9:
       tmpDay = "0%d" % (tmpDay)

    get_results(tmpYear, tmpMonth, tmpDay)
    d += delta

#emit a null record
print("{%s '%s', %s '%s', %s '%s', %s '%s', %s '%s', %s '%s', %s '%s', %s '%s'}" % ("date:", "", "league:", '', "division:", '', field[0], '', field[1], '', field[2], '', field[3], '', field[4], ''))

