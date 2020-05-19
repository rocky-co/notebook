 1 import java.awt.Color;  
  2     import java.awt.Dimension;  
  3     import java.awt.Font;  
  4     import java.awt.FontMetrics;  
  5     import java.awt.Graphics;  
  6     import java.awt.Graphics2D;  
  7     import java.awt.event.MouseEvent;  
  8     import java.awt.event.MouseListener;  
  9      
 10     import java.util.Random;  
 11       
 12     import javax.swing.JComponent;  
 13       
 14     public class Yanzhencode  extends JComponent implements MouseListener {  
 15       
 16         private String codes;  //自动生成的验证码
 17       
 18         private int width, height = 40;  //设置验证码高度、宽度
 19       
 20         private int codesLength = 4;  //设置代码长度
 21       
 22         private Random random = new Random(); //生成数字的方法 
 23       
 24         public Yanzhencode() {  
 25             width = this.codesLength * 16 + (this.codesLength - 1) * 10; //根据验证码长度设置宽度 
 26             setPreferredSize(new Dimension(width, height));  //设置背景大小
 27             setSize(width, height);  //设置验证码长度和宽度
 28             this.addMouseListener(this);  
 29             setToolTipText("点击可更换验证码");  
 30         }  
 31       //得到生成的验证码
 32         public int getCodesLength() {  
 33             return codesLength;  
 34         }  
 35       
 36        
 37         //设置验证码的长度  
 38         public void setCodesLength(int codeLength) {  
 39             if(codesLength < 4) {  
 40                 this.codesLength = 4;  
 41             } else {  
 42                 this.codesLength = codeLength;  
 43             }  
 44               
 45         }  
 46       
 47         public String getCode() {  
 48             return codes;  
 49         }  
 50       
 51          
 52            //让验证码产生随机的颜色 
 53         public Color getRandColor(int min, int max) {  
 54       
 55             if (min > 255)  
 56                 min = 255;  
 57             if (max > 255)  
 58                 max = 255;  
 59             int red = random.nextInt(max - min) + min;  
 60             int green = random.nextInt(max - min) + min;  
 61             int blue = random.nextInt(max - min) + min;  
 62             return new Color(red, green, blue);  
 63         }   
 64            // 设置验证码具体的数字或字母是什么  
 65         protected String generateCode() {  
 66             char[] codes = new char[this.codesLength];  
 67             for (int i = 0, len = codes.length; i < len; i++) {  
 68                 if (random.nextBoolean()) {  
 69                     codes[i] = (char) (random.nextInt(10) + 48);  
 70                 } else {  
 71                     codes[i] = (char) (random.nextInt(26) + 97);  
 72                 }  
 73             }  
 74             this.codes = new String(codes);  
 75             return this.codes;  
 76         }  
 77 
 78       
 79         @Override  
 80         protected void paintComponent(Graphics g) {  
 81             super.paintComponent(g);  
 82             if(this.codes == null || this.codes.length() != this.codesLength) {  //判断生成的验证码是否为空或超出长度
 83                 this.codes = generateCode();  
 84             }  
 85             width = this.codesLength * 16 + (this.codesLength - 1) * 10;  
 86             super.setSize(width, height);  //接口使用，验证码字体大小
 87             super.setPreferredSize(new Dimension(width, height));//接口使用，验证码背景大小  
 88             Font mFont = new Font("Arial", Font.BOLD | Font.ITALIC, 25);  //设置字体和字体大小
 89             g.setFont(mFont);  //设置对象
 90             //绘制出验证码的背景的矩形轮廓  
 91             Graphics2D g2d = (Graphics2D) g;  
 92             g2d.setColor(getRandColor(200, 250));  
 93             g2d.fillRect(0, 0, width, height);  
 94             g2d.setColor(getRandColor(180, 200));  
 95             g2d.drawRect(0, 0, width - 1, height - 1);  
 96             //绘制出验证码背景的线  
 97             int i = 0, len = 150;  
 98             for (; i < len; i++) {  
 99                 int x = random.nextInt(width - 1);  
100                 int y = random.nextInt(height - 1);  
101                 int x1 = random.nextInt(width - 10) + 10;  
102                 int y1 = random.nextInt(height - 4) + 4;  
103                 g2d.setColor(getRandColor(180, 200));  
104                 g2d.drawLine(x, y, x1, y1);  
105             }  
106               
107           
108       
109             //绘制出验证码的具体字母  
110             i = 0; len = this.codesLength;  
111             FontMetrics fm = g2d.getFontMetrics();  
112             int base = (height - fm.getHeight())/2 + fm.getAscent();  
113             for(;i<len;i++) {  
114                 int b = random.nextBoolean() ? 1 : -1;  
115                 g2d.rotate(random.nextInt(10)*0.01*b);  
116                 g2d.setColor(getRandColor(20, 130));  
117                 g2d.drawString(codes.charAt(i)+"", 16 * i + 10, base);  
118             }  
119         }  
120       
121         //下一个验证码  
122         public void nextCode() {  
123             generateCode();  
124             repaint();  
125         }  
126       
127         @Override  
128         public void mouseClicked(MouseEvent e) {  
129               
130             nextCode();  
131         }  
132       
133         @Override  
134         public void mousePressed(MouseEvent e) {  
135             // TODO Auto-generated method stub  
136               
137         }  
138       
139         @Override  
140         public void mouseReleased(MouseEvent e) {  
141             // TODO Auto-generated method stub  
142               
143         }  
144       
145         @Override  
146         public void mouseEntered(MouseEvent e) {  
147             // TODO Auto-generated method stub  
148               
149         }  
150       
151         @Override  
152         public void mouseExited(MouseEvent e) {  
153             // TODO Auto-generated method stub  
154               
155         }  
156     }  
