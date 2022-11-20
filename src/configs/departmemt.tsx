import _ from 'lodash';
import { Center, Container } from '@chakra-ui/react';


const FOLDER_PATH = '/src/assets/departments';
const COVER = 'cover.jpg';

const IMAGES_HD1 = _.map((new Array(8).fill(FOLDER_PATH)), (path, i) => `${path}/HD1/image (${i + 1}).jpg`);
const IMAGES_HD2 = _.map((new Array(10).fill(FOLDER_PATH)), (path, i) => `${path}/HD2/image (${i + 1}).jpg`);
const IMAGES_BD = _.map((new Array(10).fill(FOLDER_PATH)), (path, i) => `${path}/BD/image (${i + 1}).jpg`);
const IMAGES_HD = _.map((new Array(9).fill(FOLDER_PATH)), (path, i) => `${path}/HD/image (${i + 1}).jpg`);
const IMAGES_TK = _.map((new Array(44).fill(FOLDER_PATH)), (path, i) => `${path}/TK/image (${i + 1}).jpg`);
const IMAGES_MT = _.map((new Array(18).fill(FOLDER_PATH)), (path, i) => `${path}/MT/image (${i + 1}).jpg`);
console.log({ IMAGES_HD1 })

const department_names = [
  {
    name: 'Hành đường 1',
    image: `${FOLDER_PATH}/HD1/${COVER}`,
    desc: (
      <>
        <Container textAlign={'justify'} py='10px'>
          🌻 Khi những tiếng ve kêu xào xạc qua kẽ lá, lá cờ Phật giáo tung bay trên những nẻo đường,
          đó là lúc báo hiệu một mùa Phật Đản nữa lại về.
        </Container>
        <Container textAlign={'justify'} pb='10px'>
          🌻 Các bạn còn chần chờ gì nữa, hãy xách ba lô, tạm xa thành phố vài ngày để cùng tham gia với chúng mình nhé!
        </Container>
        <Container textAlign={'justify'} pb='10px'>
          🤗 Về với Team Hành Đường 1, các bạn sẽ được:
        </Container>
        <Container textAlign={'justify'} pb='10px'>
          ☘️ Chiêm ngưỡng khu chợ đầu mối rau củ “siêu độc đáo” chỉ có tại Thiền Tôn Phật Quang.
        </Container>
        <Container textAlign={'justify'} pb='10px'>
          ☘️ Tự tay lựa chọn các nguyên liệu siêu sạch, với số lượng “khổng lồ” để phục vụ hàng nghìn Phật tử,
          hỗ trợ các quý Thầy Cô nấu các món ăn thơm ngon bổ dưỡng trong căn bếp tràn đầy tình thương.
        </Container>
      </>
    ),
    code: "HD1",
    images: IMAGES_HD1,
  },
  {
    name: 'Hành đường 2',
    image: `${FOLDER_PATH}/HD2/${COVER}`,
    desc: (
      <>
        <Container>
          <Center>“Đâu cần Hành Đường 2 có</Center>
          <Center>Đâu khó có Hành Đường 2"</Center>
        </Container>
        <Container textAlign={'justify'} py='10px'>
          🌻 Tiếp nối công việc Hành Đường 1, nhiệm vụ của Hành Đường 2 là mang những phần cơm đến tận
          tay quý Phật tử và các bạn sinh viên.
          <br />
          ☘️Những hộp cơm được chuyền tận tình qua bàn tay nhỏ bé của các huynh đệ thấm đẫm tình
          thương yêu với mong muốn chăm sóc từng bữa ăn cho tất cả mọi người.
          <br />
          Khi màn đêm buông xuống, không khí se lạnh bao trùm khắp cả thung lũng Núi Dinh, những tấm
          chăn ấm áp được huynh đệ chuyền tay nhau đem phân phát đến tất cả mọi người.
          <br />
          🌻“ Phát, phát và phát” tất cả những gì tốt nhất cho các Phật tử về thăm viếng Chùa là nhiệm
          vụ chính của ban Hành Đường 2.
          <br />
          ☘️Bằng tất cả tình yêu thương và sự quan tâm, các bạn Hành Đường 2 không những trao đi từng
          hộp cơm mà trao nhau cả nụ cười đầy thân ái kèm theo đó là lời chúc tốt lành.
          <br />
          🤗Bằng tinh thần nhiệt huyết và trái tim chân thành, huynh đệ Hành Đường 2 đã góp phần tạo
          nên sự thành công của Đại lễ. Các bạn luôn cho đi mà không cần nhận lại. “Sống là cho đâu
          chỉ nhận riêng mình”
        </Container>
      </>
    ),
    code: "HD2",
    images: IMAGES_HD2,
  },
  {
    name: 'Ban tri khách',
    image: `${FOLDER_PATH}/TK/${COVER}`,
    desc: (
      <>
        <Container textAlign={'justify'} py='10px'>
          "Tri khách sinh viên,<br />
          Đón người thân trở về nhà.<br />
          Tri khách sinh viên,<br />
          Ân cần phụng sự, chu đáo tận tâm."<br />
          🔊🔊🔊 Ting ting<br />
          😊 Nghe tiếng tin nhắn đến, tự nhiên lòng Mr.Phụng Sự vui đến lạ. Cậu khẽ cười.<br />
          🙇🏻‍️ Mr. Tuổi Trẻ thấy vậy bèn tò mò hỏi Mr. Phụng Sự : Cậu ơi, có chuyện gì mà cậu vui thế?<br />
          💁🏻‍️ Mr.Phụng Sự: Cậu biết tin gì chưa? Chưa đầy 14 ngày nữa là diễn ra ĐẠI LỄ VU LAN rồi đó.<br />
          Và BAN TRI KHÁCH đang tuyển thành viên rất rầm rộ cậu ạ. Háo hức chưa?<br />
          🤷🏻‍️ Mr. Tuổi Trẻ ngạc nhiên: Vậy ban Tri Khách sẽ làm gì? 😊<br />
          💁🏻‍️ Mr.Phụng Sự trả lời: À, nhiệm vụ của ban Tri Khách là đón tiếp Phật tử gần xa với khẩu hiểu “ Ân cần - Lịch sự - Chu đáo - Tận Tâm ”.<br />
          <br />
          😊 ÂN CẦN quan tâm, hướng dẫn tận tình<br />
          😊 LỊCH SỰ trong từng lời nói và hành động.<br />
          😊 CHU ĐÁO, TẬN TÂM trong mọi nhiệm vụ.<br />
          🙆🏻‍️ Mr. Tuổi Trẻ: Uhm...nghe ý nghĩa quá nhỉ!<br />
        </Container>
      </>
    ),
    code: "TK",
    images: IMAGES_TK,
  },
  {
    name: 'Ban hướng dẫn',
    image: `${FOLDER_PATH}/HD/${COVER}`,
    desc: (
      <>
        <Container>
          <Center>“Gặp nhau trao gửi nụ cười</Center>
          <Center>Ánh mắt thân ái</Center>
          <Center>Tình người thân thương.”</Center>
        </Container>
        <Container textAlign={'justify'} py='10px'>
          🍀Được xem là gương mặt đại diện trong mùa lễ bởi lực lượng sinh viên nam thanh, nữ tú,
          trang phục đẹp và thanh lịch, luôn rạng rỡ tươi cười chào đón Phật tử từ phương xa về dự
          lễ.
        </Container>
        <Container textAlign={'justify'} pb='10px'>
          🍀Đội ngũ Ban Hướng Dẫn dàn trải khắp khuôn viên chùa và sẵn sàng hỗ trợ Phật Tử mọi lúc,
          mọi nơi với trọn tình yêu thương và lòng khiêm hạ.
        </Container>
        <Container textAlign={'justify'} pb='10px'>
          🍀Hãy về với team “Ban Hướng Dẫn” để được trải nghiệm cảm giác trong tâm thế một người ân
          cần, niềm nở, chào đón hàng nghìn từ phương xa về dự lễ.
        </Container>
      </>
    ),
    code: "HD",
    images: IMAGES_HD,
  },
  {
    name: 'Ban bồi dưỡng',
    image: `${FOLDER_PATH}/BD/${COVER}`,
    desc: (
      <>
        <Container>
          <Center>🍊🍋🍉BỒI DƯỠNG🍓🍇🍍</Center>
          <Center>"Nghe vẻ nghe ve nghe vè bồi dưỡng</Center>
          <Center>Cơm nước kỹ lưỡng, bánh trái tận tình</Center>
          <Center>Chăm sóc hết mình, luôn luôn khiêm hạ</Center>

          <Center>Bỏ hết cái ta một nhà đoàn kết</Center>
          <Center>Bồi dưỡng thật mệt nhưng mà thật vui</Center>
          <Center>Ai yêu phụng sự thì làm được thôi...."</Center>
        </Container>
        <Container textAlign={'justify'} py='10px'>
          🍀Điều kiện vào #teamBồiDưỡng không thể dễ hơn nữa!!! Nhanh tay đăng ký NGAY để hết hạn.
          Nhưng đừng đăng ký một mình nhé, phải nhiều "mình" mới vui.
        </Container>
        <Container textAlign={'justify'} pb='10px'>
          🍀Nhân dịp Đại Lễ tại Thiền Tôn Phật Quang, Chúng Thanh niên Phật tử Phật Quang Tp.HCM xin
          kêu gọi quý Phật tử, quý huynh đệ cùng các bạn thanh niên, sinh viên về tham gia dự lễ và
          công quả phụ giúp chùa.
        </Container>
      </>
    ),
    code: "BD",
    images: IMAGES_BD,
  },
  {
    name: 'Ban môi trường',
    image: `${FOLDER_PATH}/MT/${COVER}`,
    desc: (
      <>
        <Container>
          🙏 Nguyện ước cho hành tinh <br />
          Khắp nơi đều tươi xanh<br />
          Nên nghiêng mình, cúi xuống<br />
          Nhặt từng cọng rác xinh<br />
          Cùng về đây bạn ơi! <br />
          Nơi núi rừng xanh tươi<br />
          Cùng nhau phân loại rác<br />
          Vào ban Môi trường thôi <br /><br />
          🤔Bạn là người luôn trăn trở với hệ thống thùng phân loại rác và mong được phổ biến ở khắp nơi nơi?<br />
          Bạn luôn khao khát mang tới mọi người thông điệp "Respect your environment. Please! Put your litter in the bin"? <br />
          😍Vậy xin chúc mừng bạn đã "LỌT TOP" vào ban Môi trường. Nhanh tay đăng ký kẻo ngay hết hạn.<br />
          Nhưng đừng đăng ký một mình nhé, phải nhiều "mình" mới vui.
        </Container>
      </>
    ),
    code: "MT",
    images: IMAGES_MT,
  },
];
export default department_names;
