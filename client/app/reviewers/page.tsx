import CCard from '@/components/CCard';

const datas = [
  {
    id: 0,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 1,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 2,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 3,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 4,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 5,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 6,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 7,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 8,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 9,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 10,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 11,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 12,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 13,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 14,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 15,
    title: '내가 널 가르쳐주겠다',
    price: 20000,
    image: 'https://picsum.photos/id/27/200/300',
  },
];

export default function Reviewers() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div className="">총 124개</div>
        {/* 필터링 */}
        <div className="w-fit flex gap-4">
          <select>
            <option value="1">최신 등록 순</option>
            <option value="2">등급 순</option>
            <option value="3">해결 건수 순</option>
          </select>

          <select>
            <option value="1">전체 선택</option>
            <option value="2">Python</option>
            <option value="3">JavaScript</option>
            <option value="4">C</option>
            <option value="5">C++</option>
            <option value="6">C#</option>
            <option value="7">Java</option>
            <option value="8">PHP</option>
            <option value="9">Go</option>
            <option value="10">R</option>
            <option value="11">Swift</option>
          </select>
        </div>
      </div>

      {/* 리스트 */}
      <div className="w-full grid grid-cols-4 gap-x-8 gap-y-6 mt-6">
        {datas.map((data) => {
          return <CCard key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
}
