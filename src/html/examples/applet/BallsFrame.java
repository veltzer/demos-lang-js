import java.awt.*;
import java.awt.event.*;
import java.applet.Applet;

public class BallsFrame extends Applet
{
	private Ball[] arrayBalls;
	private int paintTheFirstFlag=-1;
	private static boolean firstFlag=true;

	public void init(){
		arrayBalls=new Ball[5];
		createBalls();
	}

	
	private void createBalls(){
		int position=50;

		for (int i=0;i<arrayBalls.length;i++ )
		{
			arrayBalls[i]=new Ball(position,i);
			position+=100;
			arrayBalls[i].start();
		}
	}

	
	public void paint(Graphics g){
				
		for (int i=0;i<arrayBalls.length;i++ )
		{
			if(paintTheFirstFlag==i){
				g.setColor(Color.red);
				g.fillOval(arrayBalls[i].x,arrayBalls[i].y,50,50);
				g.setColor(Color.black);
			}
			
			g.drawOval(arrayBalls[i].x,arrayBalls[i].y,50,50);
		}
	}


	/*************** Inner class *********************/
	
	private class Ball extends Thread
	{
		
		private int id,x,y=1;

		private Ball(int x,int id){
			this.x=x;
			this.id=id;
		}

		public void run(){
			while(y<350){
				y++;
				repaint();
				try{
					Thread.sleep(Math.round(Math.random()*200));
				}catch(Exception e){}
			}
		
			if(firstFlag){
				firstFlag=false;
				paintTheFirstFlag=id;
			}			
			
		}
	}



	
}
