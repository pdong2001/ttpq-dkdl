import { Box, Heading, Text, Image, VStack, HStack, Grid } from '@chakra-ui/react';
import React from 'react';

// type Props = {};
const data = {
  header:
    'Thiêng liêng, xúc động buổi lễ chính thức Đại lễ Phật Thành Đạo PL.2565 – DL.2022 tại Thiền Tôn Phật Quang',
  linkImg: 'https://thientonphatquang.com/wp-content/uploads/2022/01/8a.jpg',
  shortContent:
    'Thực hiện theo chỉ đạo của Hòa thượng thượng Thiện hạ Nhơn, chủ tịch Hội Đồng Trị Sự TW GHPGVN, rạng sáng ngày 10/01/2022 (nhằm ngày 08/12 năm Tân Sửu), khi màn sương còn giăng phủ khắp thung lũng núi Dinh, Thiền Tôn Phật Quang đã long trọng tổ chức Đại lễ kính mừng sự kiện Phật Thành Đạo trong bầu không khí vô cùng thiêng liêng và xúc động.',
  content: `Đúng 4h00 sáng, sau tiếng đại hồng chung báo hiệu chương trình bắt đầu, đèn điện các nơi đều được tắt, chỉ còn nơi tôn tượng Đức Bổn Sư tỏa ánh sáng dịu dàng. Đại chúng hướng về tôn tượng, đồng loạt bắt chân kiết già, ngồi thiền với tư thế hoa sen trong bầu không khí tĩnh mịch nơi núi rừng thiêng liêng. Khung cảnh như đang tái hiện lại đêm thành đạo thiêng liêng của Đức Phật hơn 2.600 năm về trước. Ca khúc “Đêm Thành Đạo” vang lên cũng là lúc đại chúng cùng chắp tay hướng về tôn tượng Đức Bổn Sư để tưởng nhớ khoảnh khắc huy hoàng, Thế Tôn đắc thành Phật quả vô thượng chánh đẳng chánh giác, mở ra con đường giác ngộ cho muôn loài. Ca khúc kết thúc cũng là lúc nước mắt bắt đầu xuất hiện nơi khóe mắt của rất nhiều người hiện diện nơi đây và niềm xúc động càng thêm dâng trào sau từng lời cảm niệm như chạm vào sâu thẳm trái tim của tất cả những người con Phật: “…Mỗi mùa Thành Đạo về chúng con lại được quây quần bên nhau nhớ lại lúc xưa Thế Tôn một mình một bóng trong rừng hoang lắng sâu trong thiền định để tìm giác ngộ. Ánh sáng giác ngộ đó đã mở ra con đường chân lý tuyệt vời cho thế giới này. Dù không phải ai cũng có thể hiểu được chân lý cao siêu mầu nhiệm mà Thế Tôn đã tuyên giảng, nhưng những kẻ có duyên phúc, có trí tuệ, sẽ tìm thấy nơi đây một kho tàng vô giá vượt hơn tất cả mọi điều sai lạc tầm thường khác. Chúng con nguyện sẽ đem trọn cuộc đời mình, kiếp này đến kiếp khác, sẽ tinh tấn tu tập để trải nghiệm đạo lý của Thế Tôn một cách sinh động thực tế, để có đạo lực dẫn dắt nhiều chúng sinh cùng tiến lên trên đường Chánh Pháp, để dũng cảm khôn khéo bảo vệ Chánh Pháp thoát khỏi mọi sự chống phá đê hèn, giữ cho Chánh Pháp bền vững hưng thịnh theo sự tồn tại của hành tinh”. Trong buổi lễ, mỗi người sẽ được tận tay dâng lên cúng dường Đức Phật một cành hoa tươi thắm. Tuy chỉ là một cành hoa bé nhỏ nhưng chứa đựng trong đó trọn tấm lòng tôn kính Thế Tôn và ước nguyện cao đẹp cho một thế giới hoà bình, dịch bệnh chóng qua, con người yêu thương, hoà hợp, cùng chung nhau bước đi trên con đường vô ngã.`,
  linkSubImg: [
    'https://thientonphatquang.com/wp-content/uploads/2022/01/4-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/5-23.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/aa.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/4-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/5-23.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/aa.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/aa.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/4-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/5-23.jpg',
  ],
  date: '27 Tháng Một, 2022',
};

const RegisterInfo = () => {
  return (
    <Box minH={'100vh'} width={'100%'}>
      <VStack
        width={'100%'}
        paddingTop={30}
        paddingBottom={10}
        spacing={10}
        alignSelf='center'
        justifyContent={'center'}
      >
        <Heading
          width={'80%'}
          as='h2'
          size='2xl'
          paddingTop={20}
          paddingBottom={8}
          textAlign='center'
        >
          {data.header}
        </Heading>
        <HStack width={'80%'} spacing={12} alignItems={'flex-start'}>
          <VStack spacing={5}>
            <Text fontSize={'h6'} textAlign='left'>
              {data.date}
            </Text>
            <Text as='b' fontSize={'2xl'} textAlign='justify'>
              {data.shortContent}
            </Text>
          </VStack>
          <Image width={'60%'} src={data.linkImg}></Image>
        </HStack>
        <Text width={'80%'} fontSize={{ base: 'sm', sm: 'md' }} textAlign='justify'>
          {data.content}
        </Text>

        <Grid width={'80%'} templateColumns='repeat(4, 1fr)' gap={4}>
          {data.linkSubImg.map((item, index) => (
            <Image key={index} width={'100%'} src={item}></Image>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default RegisterInfo;
