const Item = ({ id, note, date, time, deleteData, submittingStatus }) => {

  function deleteItem() {  
    submittingStatus.current = true
    deleteData(function(prev) {  //刪除prev內容
      return prev.filter(item => item.id !== id)  //刪除ID
    })
  }

  return (
    <div className="item">
      <div>
        <p>{note}</p>
        <p>{`${date} ${time}`}</p>
      </div>
      <button onClick={deleteItem} className="remove">刪除</button>
    </div>
  );
};

export default Item;
